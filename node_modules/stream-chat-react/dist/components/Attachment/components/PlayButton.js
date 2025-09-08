import React from 'react';
import { PauseIcon, PlayTriangleIcon } from '../icons';
export const PlayButton = ({ isPlaying, onClick }) => (React.createElement("button", { className: 'str-chat__message-attachment-audio-widget--play-button', "data-testid": isPlaying ? 'pause-audio' : 'play-audio', onClick: onClick }, isPlaying ? React.createElement(PauseIcon, null) : React.createElement(PlayTriangleIcon, null)));
