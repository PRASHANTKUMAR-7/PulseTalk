import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export const useChannelDeletedListener = (setChannels, customHandler) => {
    const { client } = useChatContext('useChannelDeletedListener');
    useEffect(() => {
        const handleEvent = (event) => {
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
            else {
                setChannels((channels) => {
                    const channelIndex = channels.findIndex((channel) => channel.cid === event.cid);
                    if (channelIndex < 0)
                        return [...channels];
                    // Remove the deleted channel from the list
                    channels.splice(channelIndex, 1);
                    return [...channels];
                });
            }
        };
        client.on('channel.deleted', handleEvent);
        return () => {
            client.off('channel.deleted', handleEvent);
        };
    }, [client, customHandler, setChannels]);
};
