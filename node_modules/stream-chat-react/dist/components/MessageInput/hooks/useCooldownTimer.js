import { useEffect, useMemo, useState } from 'react';
import { useChannelStateContext, useChatContext } from '../../../context';
export const useCooldownTimer = () => {
    const { client, latestMessageDatesByChannels } = useChatContext('useCooldownTimer');
    const { channel, messages = [] } = useChannelStateContext('useCooldownTimer');
    const [cooldownRemaining, setCooldownRemaining] = useState();
    const { cooldown: cooldownInterval = 0, own_capabilities } = (channel.data ||
        {});
    const skipCooldown = own_capabilities?.includes('skip-slow-mode');
    const ownLatestMessageDate = useMemo(() => latestMessageDatesByChannels[channel.cid] ??
        [...messages]
            .sort((a, b) => b.created_at?.getTime() - a.created_at?.getTime())
            .find((v) => v.user?.id === client.user?.id)?.created_at, [messages, client.user?.id, latestMessageDatesByChannels, channel.cid]);
    useEffect(() => {
        const timeSinceOwnLastMessage = ownLatestMessageDate
            ? // prevent negative values
                Math.max(0, (new Date().getTime() - ownLatestMessageDate.getTime()) / 1000)
            : undefined;
        const remaining = !skipCooldown &&
            typeof timeSinceOwnLastMessage !== 'undefined' &&
            cooldownInterval > timeSinceOwnLastMessage
            ? Math.round(cooldownInterval - timeSinceOwnLastMessage)
            : 0;
        setCooldownRemaining(remaining);
        if (!remaining)
            return;
        const timeout = setTimeout(() => {
            setCooldownRemaining(0);
        }, remaining * 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [cooldownInterval, ownLatestMessageDate, skipCooldown]);
    return {
        cooldownInterval,
        cooldownRemaining,
        setCooldownRemaining,
    };
};
