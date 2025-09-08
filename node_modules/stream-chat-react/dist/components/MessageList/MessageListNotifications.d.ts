import React from 'react';
import type { MessageNotificationProps } from './MessageNotification';
import type { ChannelNotifications } from '../../context/ChannelStateContext';
export type MessageListNotificationsProps = {
    hasNewMessages: boolean;
    isMessageListScrolledToBottom: boolean;
    isNotAtLatestMessageSet: boolean;
    MessageNotification: React.ComponentType<MessageNotificationProps>;
    notifications: ChannelNotifications;
    scrollToBottom: () => void;
    threadList?: boolean;
    unreadCount?: number;
};
export declare const MessageListNotifications: (props: MessageListNotificationsProps) => React.JSX.Element;
