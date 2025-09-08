import React from 'react';
import { FileSizeIndicator, PlaybackRateButton, PlayButton, WaveProgressBar, } from './components';
import { useAudioController } from './hooks/useAudioController';
import { displayDuration } from './utils';
import { FileIcon } from '../ReactFileUtilities';
import { useTranslationContext } from '../../context';
const rootClassName = 'str-chat__message-attachment__voice-recording-widget';
export const VoiceRecordingPlayer = ({ attachment, playbackRates, }) => {
    const { t } = useTranslationContext('VoiceRecordingPlayer');
    const { asset_url, duration = 0, mime_type, title = t('Voice message'), waveform_data, } = attachment;
    const { audioRef, increasePlaybackRate, isPlaying, playbackRate, progress, secondsElapsed, seek, togglePlay, } = useAudioController({
        durationSeconds: duration ?? 0,
        mimeType: mime_type,
        playbackRates,
    });
    if (!asset_url)
        return null;
    const displayedDuration = secondsElapsed || duration;
    return (React.createElement("div", { className: rootClassName, "data-testid": 'voice-recording-widget' },
        React.createElement("audio", { ref: audioRef },
            React.createElement("source", { "data-testid": 'audio-source', src: asset_url, type: mime_type })),
        React.createElement(PlayButton, { isPlaying: isPlaying, onClick: togglePlay }),
        React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__metadata' },
            React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__title', "data-testid": 'voice-recording-title', title: title }, title),
            React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__audio-state' },
                React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__timer' }, attachment.duration ? (displayDuration(displayedDuration)) : (React.createElement(FileSizeIndicator, { fileSize: attachment.file_size, maximumFractionDigits: 0 }))),
                React.createElement(WaveProgressBar, { progress: progress, seek: seek, waveformData: waveform_data || [] }))),
        React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__right-section' }, isPlaying ? (React.createElement(PlaybackRateButton, { disabled: !audioRef.current, onClick: increasePlaybackRate },
            playbackRate.toFixed(1),
            "x")) : (React.createElement(FileIcon, { big: true, mimeType: mime_type, size: 40 })))));
};
export const QuotedVoiceRecording = ({ attachment }) => {
    const { t } = useTranslationContext();
    const title = attachment.title || t('Voice message');
    return (React.createElement("div", { className: rootClassName, "data-testid": 'quoted-voice-recording-widget' },
        React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__metadata' },
            title && (React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__title', "data-testid": 'voice-recording-title', title: title }, title)),
            React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__audio-state' },
                React.createElement("div", { className: 'str-chat__message-attachment__voice-recording-widget__timer' }, attachment.duration ? (displayDuration(attachment.duration)) : (React.createElement(FileSizeIndicator, { fileSize: attachment.file_size, maximumFractionDigits: 0 }))))),
        React.createElement(FileIcon, { big: true, mimeType: attachment.mime_type, size: 34 })));
};
export const VoiceRecording = ({ attachment, isQuoted }) => isQuoted ? (React.createElement(QuotedVoiceRecording, { attachment: attachment })) : (React.createElement(VoiceRecordingPlayer, { attachment: attachment }));
