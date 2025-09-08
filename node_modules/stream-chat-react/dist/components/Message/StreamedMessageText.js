import React from 'react';
import { MessageText } from './MessageText';
import { useMessageContext } from '../../context';
import { useMessageTextStreaming } from './hooks';
export const StreamedMessageText = (props) => {
    const { message: messageFromProps, renderingLetterCount, renderText, streamingLetterIntervalMs, } = props;
    const { message: messageFromContext } = useMessageContext('StreamedMessageText');
    const message = messageFromProps || messageFromContext;
    const { text = '' } = message;
    const { streamedMessageText } = useMessageTextStreaming({
        renderingLetterCount,
        streamingLetterIntervalMs,
        text,
    });
    return (React.createElement(MessageText, { message: { ...message, text: streamedMessageText }, renderText: renderText }));
};
