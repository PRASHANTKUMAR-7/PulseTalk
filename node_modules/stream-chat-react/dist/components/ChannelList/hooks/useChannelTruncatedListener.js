import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export const useChannelTruncatedListener = (setChannels, customHandler, forceUpdate) => {
    const { client } = useChatContext('useChannelTruncatedListener');
    useEffect(() => {
        const handleEvent = (event) => {
            setChannels((channels) => [...channels]);
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
            if (forceUpdate) {
                forceUpdate();
            }
        };
        client.on('channel.truncated', handleEvent);
        return () => {
            client.off('channel.truncated', handleEvent);
        };
    }, [client, customHandler, forceUpdate, setChannels]);
};
