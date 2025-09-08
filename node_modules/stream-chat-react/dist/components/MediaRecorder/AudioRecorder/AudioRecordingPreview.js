import React from 'react';
import { PauseIcon, PlayIcon } from '../../MessageInput/icons';
import { RecordingTimer } from './RecordingTimer';
import { useAudioController } from '../../Attachment/hooks/useAudioController';
import { WaveProgressBar } from '../../Attachment';
export const AudioRecordingPreview = ({ durationSeconds, mimeType, waveformData, ...props }) => {
    const { audioRef, isPlaying, progress, secondsElapsed, seek, togglePlay } = useAudioController({
        durationSeconds,
        mimeType,
    });
    const displayedDuration = secondsElapsed || durationSeconds;
    return (React.createElement(React.Fragment, null,
        React.createElement("audio", { ref: audioRef },
            React.createElement("source", { src: props.src, type: mimeType })),
        React.createElement("button", { className: 'str-chat__audio_recorder__toggle-playback-button', "data-testid": 'audio-recording-preview-toggle-play-btn', onClick: togglePlay }, isPlaying ? React.createElement(PauseIcon, null) : React.createElement(PlayIcon, null)),
        React.createElement(RecordingTimer, { durationSeconds: displayedDuration }),
        React.createElement("div", { className: 'str-chat__wave-progress-bar__track-container' },
            React.createElement(WaveProgressBar, { progress: progress, seek: seek, waveformData: waveformData || [] }))));
};
