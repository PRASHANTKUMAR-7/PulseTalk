import React from 'react';
import { useTranslationContext } from '../../context';
const UnMemoizedAttachmentActions = (props) => {
    const { actionHandler, actions, id, text } = props;
    const { t } = useTranslationContext('UnMemoizedAttachmentActions');
    const handleActionClick = (event, name, value) => actionHandler?.(name, value, event);
    return (React.createElement("div", { className: 'str-chat__message-attachment-actions' },
        React.createElement("div", { className: 'str-chat__message-attachment-actions-form' },
            React.createElement("span", null, text),
            actions.map((action) => (React.createElement("button", { className: `str-chat__message-attachment-actions-button str-chat__message-attachment-actions-button--${action.style}`, "data-testid": `${action.name}`, "data-value": action.value, key: `${id}-${action.value}`, onClick: (event) => handleActionClick(event, action.name, action.value) }, action.text ? t(action.text) : null))))));
};
/**
 * A component for rendering the actions you can take on an attachment.
 */
export const AttachmentActions = React.memo(UnMemoizedAttachmentActions);
