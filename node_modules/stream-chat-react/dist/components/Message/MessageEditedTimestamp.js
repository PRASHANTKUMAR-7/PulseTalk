import React from 'react';
import clsx from 'clsx';
import { useComponentContext, useMessageContext, useTranslationContext, } from '../../context';
import { Timestamp as DefaultTimestamp } from './Timestamp';
import { isMessageEdited } from './utils';
export function MessageEditedTimestamp({ message: propMessage, open, ...timestampProps }) {
    const { t } = useTranslationContext('MessageEditedTimestamp');
    const { message: contextMessage } = useMessageContext('MessageEditedTimestamp');
    const { Timestamp = DefaultTimestamp } = useComponentContext('MessageEditedTimestamp');
    const message = propMessage || contextMessage;
    if (!isMessageEdited(message)) {
        return null;
    }
    return (React.createElement("div", { className: clsx('str-chat__message-edited-timestamp', open
            ? 'str-chat__message-edited-timestamp--open'
            : 'str-chat__message-edited-timestamp--collapsed'), "data-testid": 'message-edited-timestamp' },
        t('Edited'),
        ' ',
        React.createElement(Timestamp, { timestamp: message.message_text_updated_at, ...timestampProps })));
}
