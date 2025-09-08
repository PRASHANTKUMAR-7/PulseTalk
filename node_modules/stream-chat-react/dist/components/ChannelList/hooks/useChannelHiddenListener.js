import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export const useChannelHiddenListener = (setChannels, customHandler) => {
    const { client } = useChatContext('useChannelHiddenListener');
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
                    // Remove the hidden channel from the list.s
                    channels.splice(channelIndex, 1);
                    return [...channels];
                });
            }
        };
        client.on('channel.hidden', handleEvent);
        return () => {
            client.off('channel.hidden', handleEvent);
        };
    }, [client, customHandler, setChannels]);
};
