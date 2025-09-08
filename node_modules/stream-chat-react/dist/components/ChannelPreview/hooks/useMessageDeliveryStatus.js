import { useCallback, useEffect, useState } from 'react';
import { useChatContext } from '../../../context';
export var MessageDeliveryStatus;
(function (MessageDeliveryStatus) {
    MessageDeliveryStatus["DELIVERED"] = "delivered";
    MessageDeliveryStatus["READ"] = "read";
})(MessageDeliveryStatus || (MessageDeliveryStatus = {}));
export const useMessageDeliveryStatus = ({ channel, lastMessage, }) => {
    const { client } = useChatContext();
    const [messageDeliveryStatus, setMessageDeliveryStatus] = useState();
    const isOwnMessage = useCallback((message) => client.user && message?.user?.id === client.user.id, [client]);
    useEffect(() => {
        const lastMessageIsOwn = isOwnMessage(lastMessage);
        if (!lastMessage?.created_at || !lastMessageIsOwn)
            return;
        const lastMessageCreatedAtDate = typeof lastMessage.created_at === 'string'
            ? new Date(lastMessage.created_at)
            : lastMessage.created_at;
        const channelReadByOthersAfterLastMessageUpdate = Object.values(channel.state.read).some(({ last_read: channelLastMarkedReadDate, user }) => {
            const ignoreOwnReadStatus = client.user && user.id !== client.user.id;
            return ignoreOwnReadStatus && lastMessageCreatedAtDate < channelLastMarkedReadDate;
        });
        setMessageDeliveryStatus(channelReadByOthersAfterLastMessageUpdate
            ? MessageDeliveryStatus.READ
            : MessageDeliveryStatus.DELIVERED);
    }, [channel.state.read, client, isOwnMessage, lastMessage]);
    useEffect(() => {
        const handleMessageNew = (event) => {
            // the last message is not mine, so do not show the delivery status
            if (!isOwnMessage(event.message)) {
                return setMessageDeliveryStatus(undefined);
            }
            return setMessageDeliveryStatus(MessageDeliveryStatus.DELIVERED);
        };
        channel.on('message.new', handleMessageNew);
        return () => {
            channel.off('message.new', handleMessageNew);
        };
    }, [channel, client, isOwnMessage]);
    useEffect(() => {
        if (!isOwnMessage(lastMessage))
            return;
        const handleMarkRead = (event) => {
            if (event.user?.id !== client.user?.id)
                setMessageDeliveryStatus(MessageDeliveryStatus.READ);
        };
        channel.on('message.read', handleMarkRead);
        return () => {
            channel.off('message.read', handleMarkRead);
        };
    }, [channel, client, lastMessage, isOwnMessage]);
    return {
        messageDeliveryStatus,
    };
};
