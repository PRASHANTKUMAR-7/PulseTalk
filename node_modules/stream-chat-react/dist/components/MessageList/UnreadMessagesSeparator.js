import React from 'react';
import { useTranslationContext } from '../../context';
export const UNREAD_MESSAGE_SEPARATOR_CLASS = 'str-chat__unread-messages-separator';
export const UnreadMessagesSeparator = ({ showCount, unreadCount, }) => {
    const { t } = useTranslationContext('UnreadMessagesSeparator');
    return (React.createElement("div", { className: UNREAD_MESSAGE_SEPARATOR_CLASS, "data-testid": 'unread-messages-separator' }, unreadCount && showCount
        ? t('unreadMessagesSeparatorText', { count: unreadCount })
        : t('Unread messages')));
};
