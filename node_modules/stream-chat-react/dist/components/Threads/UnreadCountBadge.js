import clsx from 'clsx';
import React from 'react';
export const UnreadCountBadge = ({ children, count, position, }) => (React.createElement("div", { className: 'str-chat__unread-count-badge-container' },
    children,
    count > 0 && (React.createElement("div", { className: clsx('str-chat__unread-count-badge', position && `str-chat__unread-count-badge--${position}`) }, count))));
