import React from 'react';
import { CloseIcon } from './icons';
import { useChannelActionContext, useTranslationContext } from '../../context';
export const UnreadMessagesNotification = ({ queryMessageLimit, showCount, unreadCount, }) => {
    const { jumpToFirstUnreadMessage, markRead } = useChannelActionContext('UnreadMessagesNotification');
    const { t } = useTranslationContext('UnreadMessagesNotification');
    return (React.createElement("div", { className: 'str-chat__unread-messages-notification', "data-testid": 'unread-messages-notification' },
        React.createElement("button", { onClick: () => jumpToFirstUnreadMessage(queryMessageLimit) }, unreadCount && showCount
            ? t('{{count}} unread', { count: unreadCount ?? 0 })
            : t('Unread messages')),
        React.createElement("button", { onClick: () => markRead() },
            React.createElement(CloseIcon, null))));
};
