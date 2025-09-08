import React from 'react';
import { useMessageBounceContext, useTranslationContext } from '../../context';
export function MessageBouncePrompt({ children, onClose }) {
    const { handleDelete, handleEdit, handleRetry } = useMessageBounceContext('MessageBouncePrompt');
    const { t } = useTranslationContext('MessageBouncePrompt');
    function createHandler(handle) {
        return (e) => {
            handle(e);
            onClose?.(e);
        };
    }
    return (React.createElement("div", { className: 'str-chat__message-bounce-prompt', "data-testid": 'message-bounce-prompt' },
        React.createElement("div", { className: 'str-chat__message-bounce-prompt-header' }, children ?? t('This message did not meet our content guidelines')),
        React.createElement("div", { className: 'str-chat__message-bounce-actions' },
            React.createElement("button", { className: 'str-chat__message-bounce-edit', "data-testid": 'message-bounce-edit', onClick: createHandler(handleEdit), type: 'button' }, t('Edit Message')),
            React.createElement("button", { className: 'str-chat__message-bounce-send', "data-testid": 'message-bounce-send', onClick: createHandler(handleRetry) }, t('Send Anyway')),
            React.createElement("button", { className: 'str-chat__message-bounce-delete', "data-testid": 'message-bounce-delete', onClick: createHandler(handleDelete) }, t('Delete')))));
}
