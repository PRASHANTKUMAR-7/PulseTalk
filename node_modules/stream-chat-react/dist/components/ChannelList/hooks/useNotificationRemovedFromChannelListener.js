import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export const useNotificationRemovedFromChannelListener = (setChannels, customHandler) => {
    const { client } = useChatContext('useNotificationRemovedFromChannelListener');
    useEffect(() => {
        const handleEvent = (event) => {
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
            else {
                setChannels((channels) => channels.filter((channel) => channel.cid !== event.channel?.cid));
            }
        };
        client.on('notification.removed_from_channel', handleEvent);
        return () => {
            client.off('notification.removed_from_channel', handleEvent);
        };
    }, [client, customHandler, setChannels]);
};
