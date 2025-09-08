export type UseUnreadMessagesNotificationParams = {
    isMessageListScrolledToBottom: boolean;
    showAlways: boolean;
    unreadCount?: number;
};
export declare const useUnreadMessagesNotification: ({ isMessageListScrolledToBottom, showAlways, unreadCount, }: UseUnreadMessagesNotificationParams) => {
    show: boolean;
};
