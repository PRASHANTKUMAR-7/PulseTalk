import React from 'react';
export type UnreadMessagesNotificationProps = {
    /**
     * Configuration parameter to determine the message page size, when jumping to the first unread message.
     */
    queryMessageLimit?: number;
    /**
     * Configuration parameter to determine, whether the unread count is to be shown on the component. Disabled by default.
     */
    showCount?: boolean;
    /**
     * The count of unread messages to be displayed if enabled.
     */
    unreadCount?: number;
};
export declare const UnreadMessagesNotification: ({ queryMessageLimit, showCount, unreadCount, }: UnreadMessagesNotificationProps) => React.JSX.Element;
