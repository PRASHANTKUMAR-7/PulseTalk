import React from 'react';
import clsx from 'clsx';
import { useChannelStateContext } from '../../context/ChannelStateContext';
const UnMemoizedWindow = (props) => {
    const { children, thread: propThread } = props;
    const { thread: contextThread } = useChannelStateContext('Window');
    return (React.createElement("div", { className: clsx('str-chat__main-panel', {
            'str-chat__main-panel--thread-open': contextThread || propThread,
        }) }, children));
};
/**
 * A UI component for conditionally displaying a Thread or Channel
 */
export const Window = React.memo(UnMemoizedWindow);
