import React from 'react';
import { useUserRole } from './hooks/useUserRole';
import { useTranslationContext } from '../../context/TranslationContext';
export const MessageDeleted = (props) => {
    const { message } = props;
    const { t } = useTranslationContext('MessageDeleted');
    const { isMyMessage } = useUserRole(message);
    const messageClasses = isMyMessage
        ? 'str-chat__message str-chat__message--me str-chat__message-simple str-chat__message-simple--me'
        : 'str-chat__message str-chat__message-simple str-chat__message--other';
    return (React.createElement("div", { className: `${messageClasses} str-chat__message--deleted ${message.type} `, "data-testid": 'message-deleted-component', key: message.id },
        React.createElement("div", { className: 'str-chat__message--deleted-inner' }, t('This message was deleted...'))));
};
