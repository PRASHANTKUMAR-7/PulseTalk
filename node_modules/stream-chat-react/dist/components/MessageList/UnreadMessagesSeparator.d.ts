import React from 'react';
export declare const UNREAD_MESSAGE_SEPARATOR_CLASS = "str-chat__unread-messages-separator";
export type UnreadMessagesSeparatorProps = {
    /**
     * Configuration parameter to determine, whether the unread count is to be shown on the component. Disabled by default.
     */
    showCount?: boolean;
    /**
     * The count of unread messages to be displayed if enabled.
     */
    unreadCount?: number;
};
export declare const UnreadMessagesSeparator: ({ showCount, unreadCount, }: UnreadMessagesSeparatorProps) => React.JSX.Element;
