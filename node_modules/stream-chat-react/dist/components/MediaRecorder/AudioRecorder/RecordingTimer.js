import clsx from 'clsx';
import { displayDuration } from '../../Attachment';
import React from 'react';
export const RecordingTimer = ({ durationSeconds }) => (React.createElement("div", { className: clsx('str-chat__recording-timer', {
        'str-chat__recording-timer--hours': durationSeconds >= 3600,
    }) }, displayDuration(durationSeconds)));
