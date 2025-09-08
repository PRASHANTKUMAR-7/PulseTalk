import { useEffect } from 'react';
import { useChatContext } from '../../../context/ChatContext';
export const useUserPresenceChangedListener = (setChannels) => {
    const { client } = useChatContext('useUserPresenceChangedListener');
    useEffect(() => {
        const handleEvent = (event) => {
            setChannels((channels) => {
                const newChannels = channels.map((channel) => {
                    if (!event.user?.id || !channel.state.members[event.user.id]) {
                        return channel;
                    }
                    const newChannel = channel; // dumb workaround for linter
                    newChannel.state.members[event.user.id].user = event.user;
                    return newChannel;
                });
                return [...newChannels];
            });
        };
        client.on('user.presence.changed', handleEvent);
        return () => {
            client.off('user.presence.changed', handleEvent);
        };
    }, [client, setChannels]);
};
