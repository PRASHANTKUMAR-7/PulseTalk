import { useEffect } from 'react';
import uniqBy from 'lodash.uniqby';
import { getChannel } from '../../../utils/getChannel';
import { useChatContext } from '../../../context/ChatContext';
export const useNotificationMessageNewListener = (setChannels, customHandler, allowNewMessagesFromUnfilteredChannels = true) => {
    const { client } = useChatContext('useNotificationMessageNewListener');
    useEffect(() => {
        const handleEvent = async (event) => {
            if (customHandler && typeof customHandler === 'function') {
                customHandler(setChannels, event);
            }
            else if (allowNewMessagesFromUnfilteredChannels && event.channel?.type) {
                const channel = await getChannel({
                    client,
                    id: event.channel.id,
                    type: event.channel.type,
                });
                setChannels((channels) => uniqBy([channel, ...channels], 'cid'));
            }
        };
        client.on('notification.message_new', handleEvent);
        return () => {
            client.off('notification.message_new', handleEvent);
        };
    }, [allowNewMessagesFromUnfilteredChannels, client, customHandler, setChannels]);
};
