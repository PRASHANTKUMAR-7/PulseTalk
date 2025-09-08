import React from 'react';
import { useMessageContext } from '../../context/MessageContext';
import { Timestamp as DefaultTimestamp } from './Timestamp';
import { useComponentContext } from '../../context';
const UnMemoizedMessageTimestamp = (props) => {
    const { message: propMessage, ...timestampProps } = props;
    const { message: contextMessage } = useMessageContext('MessageTimestamp');
    const { Timestamp = DefaultTimestamp } = useComponentContext('MessageTimestamp');
    const message = propMessage || contextMessage;
    return React.createElement(Timestamp, { timestamp: message.created_at, ...timestampProps });
};
export const MessageTimestamp = React.memo(UnMemoizedMessageTimestamp);
