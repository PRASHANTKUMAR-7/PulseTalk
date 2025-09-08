import React from 'react';
import { DownloadButton, FileSizeIndicator, PlayButton, ProgressBar } from './components';
import { useAudioController } from './hooks/useAudioController';
const UnMemoizedAudio = (props) => {
    const { og: { asset_url, file_size, mime_type, title }, } = props;
    const { audioRef, isPlaying, progress, seek, togglePlay } = useAudioController({
        mimeType: mime_type,
    });
    if (!asset_url)
        return null;
    const dataTestId = 'audio-widget';
    const rootClassName = 'str-chat__message-attachment-audio-widget';
    return (React.createElement("div", { className: rootClassName, "data-testid": dataTestId },
        React.createElement("audio", { ref: audioRef },
            React.createElement("source", { "data-testid": 'audio-source', src: asset_url, type: 'audio/mp3' })),
        React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--play-controls' },
            React.createElement(PlayButton, { isPlaying: isPlaying, onClick: togglePlay })),
        React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--text' },
            React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--text-first-row' },
                React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--title' }, title),
                React.createElement(DownloadButton, { assetUrl: asset_url })),
            React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--text-second-row' },
                React.createElement(FileSizeIndicator, { fileSize: file_size }),
                React.createElement(ProgressBar, { onClick: seek, progress: progress })))));
};
/**
 * Audio attachment with play/pause button and progress bar
 */
export const Audio = React.memo(UnMemoizedAudio);
