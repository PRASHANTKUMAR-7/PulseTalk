import React from 'react';
import { Message } from '../Message';
import { ThreadStart as DefaultThreadStart } from './ThreadStart';
import { useComponentContext } from '../../context';
export const ThreadHead = (props) => {
    const { ThreadStart = DefaultThreadStart } = useComponentContext('ThreadHead');
    return (React.createElement("div", { className: 'str-chat__parent-message-li' },
        React.createElement(Message, { initialMessage: true, threadList: true, ...props }),
        React.createElement(ThreadStart, null)));
};
