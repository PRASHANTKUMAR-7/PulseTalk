import clsx from 'clsx';
import React from 'react';
export const ProgressBar = ({ className, onClick, progress }) => (React.createElement("div", { className: clsx('str-chat__message-attachment-audio-widget--progress-track', className), "data-progress": progress, "data-testid": 'audio-progress', onClick: onClick, role: 'progressbar', style: {
        '--str-chat__message-attachment-audio-widget-progress': progress + '%',
    } },
    React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--progress-slider', style: { left: `${progress}px` } })));
