import clsx from 'clsx';
import React from 'react';
import { ActionsIcon as DefaultActionsIcon, ReactionIcon as DefaultReactionIcon, ThreadIcon as DefaultThreadIcon, } from './icons';
import { MESSAGE_ACTIONS } from './utils';
import { MessageActions } from '../MessageActions';
import { useDialogIsOpen } from '../Dialog';
import { ReactionSelectorWithButton } from '../Reactions/ReactionSelectorWithButton';
import { useMessageContext, useTranslationContext } from '../../context';
const UnMemoizedMessageOptions = (props) => {
    const { ActionsIcon = DefaultActionsIcon, displayReplies = true, handleOpenThread: propHandleOpenThread, ReactionIcon = DefaultReactionIcon, theme = 'simple', ThreadIcon = DefaultThreadIcon, } = props;
    const { getMessageActions, handleOpenThread: contextHandleOpenThread, initialMessage, message, threadList, } = useMessageContext('MessageOptions');
    const { t } = useTranslationContext('MessageOptions');
    const messageActionsDialogIsOpen = useDialogIsOpen(`message-actions--${message.id}`);
    const reactionSelectorDialogIsOpen = useDialogIsOpen(`reaction-selector--${message.id}`);
    const handleOpenThread = propHandleOpenThread || contextHandleOpenThread;
    const messageActions = getMessageActions();
    const shouldShowReactions = messageActions.indexOf(MESSAGE_ACTIONS.react) > -1;
    const shouldShowReplies = messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 && displayReplies && !threadList;
    if (!message.type ||
        message.type === 'error' ||
        message.type === 'system' ||
        message.type === 'ephemeral' ||
        message.status === 'failed' ||
        message.status === 'sending' ||
        initialMessage) {
        return null;
    }
    return (React.createElement("div", { className: clsx(`str-chat__message-${theme}__actions str-chat__message-options`, {
            'str-chat__message-options--active': messageActionsDialogIsOpen || reactionSelectorDialogIsOpen,
        }), "data-testid": 'message-options' },
        React.createElement(MessageActions, { ActionsIcon: ActionsIcon }),
        shouldShowReplies && (React.createElement("button", { "aria-label": t('aria/Open Thread'), className: `str-chat__message-${theme}__actions__action str-chat__message-${theme}__actions__action--thread str-chat__message-reply-in-thread-button`, "data-testid": 'thread-action', onClick: handleOpenThread },
            React.createElement(ThreadIcon, { className: 'str-chat__message-action-icon' }))),
        shouldShowReactions && React.createElement(ReactionSelectorWithButton, { ReactionIcon: ReactionIcon })));
};
export const MessageOptions = React.memo(UnMemoizedMessageOptions);
