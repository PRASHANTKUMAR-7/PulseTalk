import React, { useRef } from 'react';
import { ReactionSelector as DefaultReactionSelector } from './ReactionSelector';
import { DialogAnchor, useDialog, useDialogIsOpen } from '../Dialog';
import { useComponentContext, useMessageContext, useTranslationContext, } from '../../context';
/**
 * Internal convenience component - not to be exported. It just groups the button and the dialog anchor and thus prevents
 * cluttering the parent component.
 */
export const ReactionSelectorWithButton = ({ ReactionIcon, }) => {
    const { t } = useTranslationContext('ReactionSelectorWithButton');
    const { isMyMessage, message } = useMessageContext('MessageOptions');
    const { ReactionSelector = DefaultReactionSelector } = useComponentContext('MessageOptions');
    const buttonRef = useRef(null);
    const dialogId = `reaction-selector--${message.id}`;
    const dialog = useDialog({ id: dialogId });
    const dialogIsOpen = useDialogIsOpen(dialogId);
    return (React.createElement(React.Fragment, null,
        React.createElement(DialogAnchor, { id: dialogId, placement: isMyMessage() ? 'top-end' : 'top-start', referenceElement: buttonRef.current, trapFocus: true },
            React.createElement(ReactionSelector, null)),
        React.createElement("button", { "aria-expanded": dialogIsOpen, "aria-label": t('aria/Open Reaction Selector'), className: 'str-chat__message-reactions-button', "data-testid": 'message-reaction-action', onClick: () => dialog?.toggle(), ref: buttonRef },
            React.createElement(ReactionIcon, { className: 'str-chat__message-action-icon' }))));
};
