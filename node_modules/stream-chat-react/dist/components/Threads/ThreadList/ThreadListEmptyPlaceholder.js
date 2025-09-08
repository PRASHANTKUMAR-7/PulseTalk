import React from 'react';
import { Icon } from '../icons';
export const ThreadListEmptyPlaceholder = () => (React.createElement("div", { className: 'str-chat__thread-list-empty-placeholder' },
    React.createElement(Icon.MessageBubble, null),
    "No threads here yet..."));
