import { BehaviorSubject } from '../observable/BehaviorSubject';
import { Subject } from '../observable/Subject';
import { mergeDeepUndefined } from '../../../utils/mergeDeep';
const MAX_FREQUENCY_AMPLITUDE = 255;
const logError = (e) => e && console.error('[AMPLITUDE RECORDER ERROR]', e);
const rootMeanSquare = (values) => Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val, 2), 0) / values.length);
export const DEFAULT_AMPLITUDE_RECORDER_CONFIG = {
    analyserConfig: {
        fftSize: 32,
        maxDecibels: 0,
        minDecibels: -100,
    },
    sampleCount: 100,
    samplingFrequencyMs: 60,
};
export var AmplitudeRecorderState;
(function (AmplitudeRecorderState) {
    AmplitudeRecorderState["CLOSED"] = "closed";
    AmplitudeRecorderState["RECORDING"] = "recording";
    AmplitudeRecorderState["STOPPED"] = "stopped";
})(AmplitudeRecorderState || (AmplitudeRecorderState = {}));
export class AmplitudeRecorder {
    constructor({ config, stream }) {
        this.amplitudes = new BehaviorSubject([]);
        this.state = new BehaviorSubject(undefined);
        this.error = new Subject();
        this.start = () => {
            if (this.state.value === AmplitudeRecorderState.CLOSED)
                return;
            if (!this.stream) {
                throw new Error('Missing MediaStream instance. Cannot to start amplitude recording');
            }
            if (this.state.value === AmplitudeRecorderState.RECORDING)
                this.stop();
            if (!this.analyserNode) {
                if (!this.stream)
                    return;
                this.init();
            }
            this.state.next(AmplitudeRecorderState.RECORDING);
            this.amplitudeSamplingInterval = setInterval(() => {
                if (!(this.analyserNode && this.state.value === AmplitudeRecorderState.RECORDING))
                    return;
                const frequencyBins = new Uint8Array(this.analyserNode.frequencyBinCount);
                try {
                    this.analyserNode.getByteFrequencyData(frequencyBins);
                }
                catch (e) {
                    logError(e);
                    this.error.next(e);
                    return;
                }
                const normalizedSignalStrength = rootMeanSquare(frequencyBins) / MAX_FREQUENCY_AMPLITUDE;
                this.amplitudes.next([...this.amplitudes.value, normalizedSignalStrength]);
            }, this.config.samplingFrequencyMs);
        };
        this.config = mergeDeepUndefined({ ...config }, DEFAULT_AMPLITUDE_RECORDER_CONFIG);
        this.stream = stream;
    }
    init() {
        this.audioContext = new AudioContext();
        this.analyserNode = this.audioContext.createAnalyser();
        const { analyserConfig } = this.config;
        this.analyserNode.fftSize = analyserConfig.fftSize;
        this.analyserNode.maxDecibels = analyserConfig.maxDecibels;
        this.analyserNode.minDecibels = analyserConfig.minDecibels;
        this.microphone = this.audioContext.createMediaStreamSource(this.stream);
        this.microphone.connect(this.analyserNode);
    }
    stop() {
        clearInterval(this.amplitudeSamplingInterval);
        this.amplitudeSamplingInterval = undefined;
        this.state.next(AmplitudeRecorderState.STOPPED);
    }
    close() {
        if (this.state.value !== AmplitudeRecorderState.STOPPED)
            this.stop();
        this.state.next(AmplitudeRecorderState.CLOSED);
        this.amplitudes.next([]);
        this.microphone?.disconnect();
        this.analyserNode?.disconnect();
        if (this.audioContext?.state !== 'closed')
            this.audioContext?.close();
    }
}
