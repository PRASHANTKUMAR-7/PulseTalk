import fixWebmDuration from 'fix-webm-duration';
import { nanoid } from 'nanoid';
import { AmplitudeRecorder, DEFAULT_AMPLITUDE_RECORDER_CONFIG, } from './AmplitudeRecorder';
import { BrowserPermission } from './BrowserPermission';
import { BehaviorSubject, Subject } from '../observable';
import { transcode } from '../transcode';
import { resampleWaveformData } from '../../Attachment';
import { createFileFromBlobs, getExtensionFromMimeType, getRecordedMediaTypeFromMimeType, } from '../../ReactFileUtilities';
import { defaultTranslatorFunction } from '../../../i18n';
import { mergeDeepUndefined } from '../../../utils/mergeDeep';
export const RECORDED_MIME_TYPE_BY_BROWSER = {
    audio: {
        others: 'audio/webm',
        safari: 'audio/mp4;codecs=mp4a.40.2',
    },
};
export const DEFAULT_AUDIO_TRANSCODER_CONFIG = {
    sampleRate: 16000,
};
const disposeOfMediaStream = (stream) => {
    if (!stream?.active)
        return;
    stream.getTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
    });
};
const logError = (e) => e && console.error('[MEDIA RECORDER ERROR]', e);
export var MediaRecordingState;
(function (MediaRecordingState) {
    MediaRecordingState["PAUSED"] = "paused";
    MediaRecordingState["RECORDING"] = "recording";
    MediaRecordingState["STOPPED"] = "stopped";
})(MediaRecordingState || (MediaRecordingState = {}));
export var RecordingAttachmentType;
(function (RecordingAttachmentType) {
    RecordingAttachmentType["VOICE_RECORDING"] = "voiceRecording";
})(RecordingAttachmentType || (RecordingAttachmentType = {}));
export class MediaRecorderController {
    constructor({ config, generateRecordingTitle, t } = {}) {
        this.recordedChunkDurations = [];
        this.recordedData = [];
        this.recordingState = new BehaviorSubject(undefined);
        this.recording = new BehaviorSubject(undefined);
        this.error = new Subject();
        this.notification = new Subject();
        this.generateRecordingTitle = (mimeType) => {
            if (this.customGenerateRecordingTitle) {
                return this.customGenerateRecordingTitle(mimeType);
            }
            return `${this.mediaType}_recording_${new Date().toISOString()}.${getExtensionFromMimeType(mimeType)}`; // extension needed so that desktop Safari can play the asset
        };
        this.makeVoiceRecording = async () => {
            if (this.recordingUri)
                URL.revokeObjectURL(this.recordingUri);
            if (!this.recordedData.length)
                return;
            const { mimeType } = this.mediaRecorderConfig;
            let blob = new Blob(this.recordedData, { type: mimeType });
            if (mimeType.match('audio/webm')) {
                // The browser does not include duration metadata with the recorded blob
                blob = await fixWebmDuration(blob, this.durationMs, {
                    logger: () => null, // prevents polluting the browser console
                });
            }
            if (!mimeType.match('audio/mp4')) {
                blob = await transcode({
                    blob,
                    ...this.transcoderConfig,
                });
            }
            if (!blob)
                return;
            this.recordingUri = URL.createObjectURL(blob);
            const file = createFileFromBlobs({
                blobsArray: [blob],
                fileName: this.generateRecordingTitle(blob.type),
                mimeType: blob.type,
            });
            return {
                asset_url: this.recordingUri,
                duration: this.durationMs / 1000,
                file_size: blob.size,
                localMetadata: {
                    file,
                    id: nanoid(),
                },
                mime_type: blob.type,
                title: file.name,
                type: RecordingAttachmentType.VOICE_RECORDING,
                waveform_data: resampleWaveformData(this.amplitudeRecorder?.amplitudes.value ?? [], this.amplitudeRecorderConfig.sampleCount),
            };
        };
        this.handleErrorEvent = (e) => {
            const { error } = e;
            logError(error);
            this.error.next(error);
            this.notification.next({
                text: this.t('An error has occurred during recording'),
                type: 'error',
            });
        };
        this.handleDataavailableEvent = async (e) => {
            if (!e.data.size)
                return;
            if (this.mediaType !== 'audio')
                return;
            try {
                this.recordedData.push(e.data);
                const recording = await this.makeVoiceRecording();
                if (!recording)
                    return;
                this.signalRecordingReady?.(recording);
                this.recording.next(recording);
            }
            catch (e) {
                logError(e);
                this.error.next(e);
                this.notification.next({
                    text: this.t('An error has occurred during the recording processing'),
                    type: 'error',
                });
            }
        };
        this.resetRecordingState = () => {
            this.recordedData = [];
            this.recording.next(undefined);
            this.recordingState.next(undefined);
            this.recordedChunkDurations = [];
            this.startTime = undefined;
        };
        this.cleanUp = () => {
            this.resetRecordingState();
            if (this.recordingUri)
                URL.revokeObjectURL(this.recordingUri);
            this.amplitudeRecorder?.close();
            if (this.mediaRecorder) {
                disposeOfMediaStream(this.mediaRecorder.stream);
                this.mediaRecorder.removeEventListener('dataavailable', this.handleDataavailableEvent);
                this.mediaRecorder.removeEventListener('error', this.handleErrorEvent);
            }
        };
        this.start = async () => {
            if ([MediaRecordingState.RECORDING, MediaRecordingState.PAUSED].includes(this.recordingState.value)) {
                const error = new Error('Cannot start recording. Recording already in progress');
                logError(error);
                this.error.next(error);
                return;
            }
            // account for requirement on iOS as per this bug report: https://bugs.webkit.org/show_bug.cgi?id=252303
            if (!navigator.mediaDevices) {
                const error = new Error('Media recording is not supported');
                logError(error);
                this.error.next(error);
                this.notification.next({ text: this.t('Error starting recording'), type: 'error' });
                return;
            }
            if (this.mediaType === 'video') {
                const error = new Error(`Video recording is not supported. Provided MIME type: ${this.mediaRecorderConfig.mimeType}`);
                logError(error);
                this.error.next(error);
                this.notification.next({ text: this.t('Error starting recording'), type: 'error' });
                return;
            }
            if (!this.permission.state.value) {
                await this.permission.check();
            }
            if (this.permission.state.value === 'denied') {
                logError(new Error('Permission denied'));
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream, this.mediaRecorderConfig);
                this.mediaRecorder.addEventListener('dataavailable', this.handleDataavailableEvent);
                this.mediaRecorder.addEventListener('error', this.handleErrorEvent);
                this.startTime = new Date().getTime();
                this.mediaRecorder.start();
                if (this.mediaType === 'audio' && stream) {
                    this.amplitudeRecorder = new AmplitudeRecorder({
                        config: this.amplitudeRecorderConfig,
                        stream,
                    });
                    this.amplitudeRecorder.start();
                }
                this.recordingState.next(MediaRecordingState.RECORDING);
            }
            catch (error) {
                logError(error);
                this.cancel();
                this.error.next(error);
                this.notification.next({ text: this.t('Error starting recording'), type: 'error' });
            }
        };
        this.pause = () => {
            if (this.recordingState.value !== MediaRecordingState.RECORDING)
                return;
            if (this.startTime) {
                this.recordedChunkDurations.push(new Date().getTime() - this.startTime);
                this.startTime = undefined;
            }
            this.mediaRecorder?.pause();
            this.amplitudeRecorder?.stop();
            this.recordingState.next(MediaRecordingState.PAUSED);
        };
        this.resume = () => {
            if (this.recordingState.value !== MediaRecordingState.PAUSED)
                return;
            this.startTime = new Date().getTime();
            this.mediaRecorder?.resume();
            this.amplitudeRecorder?.start();
            this.recordingState.next(MediaRecordingState.RECORDING);
        };
        this.stop = () => {
            const recording = this.recording.value;
            if (recording)
                return Promise.resolve(recording);
            if (![MediaRecordingState.PAUSED, MediaRecordingState.RECORDING].includes((this.mediaRecorder?.state || '')))
                return Promise.resolve(undefined);
            if (this.startTime) {
                this.recordedChunkDurations.push(new Date().getTime() - this.startTime);
                this.startTime = undefined;
            }
            const result = new Promise((res) => {
                this.signalRecordingReady = res;
            });
            this.mediaRecorder?.stop();
            this.amplitudeRecorder?.stop();
            this.recordingState.next(MediaRecordingState.STOPPED);
            return result;
        };
        this.cancel = () => {
            this.stop();
            this.cleanUp();
        };
        this.t = t || defaultTranslatorFunction;
        this.amplitudeRecorderConfig = mergeDeepUndefined({ ...config?.amplitudeRecorderConfig }, DEFAULT_AMPLITUDE_RECORDER_CONFIG);
        this.mediaRecorderConfig = mergeDeepUndefined({ ...config?.mediaRecorderConfig }, {
            mimeType: MediaRecorder.isTypeSupported('audio/webm')
                ? RECORDED_MIME_TYPE_BY_BROWSER.audio.others
                : RECORDED_MIME_TYPE_BY_BROWSER.audio.safari,
        });
        this.transcoderConfig = mergeDeepUndefined({ ...config?.transcoderConfig }, DEFAULT_AUDIO_TRANSCODER_CONFIG);
        const mediaType = getRecordedMediaTypeFromMimeType(this.mediaRecorderConfig.mimeType);
        if (!mediaType) {
            throw new Error(`Unsupported media type (supported audio or video only). Provided mimeType: ${this.mediaRecorderConfig.mimeType}`);
        }
        this.mediaType = mediaType;
        this.permission = new BrowserPermission({ mediaType });
        this.customGenerateRecordingTitle = generateRecordingTitle;
    }
    get durationMs() {
        return this.recordedChunkDurations.reduce((acc, val) => acc + val, 0);
    }
}
