import { useCallback } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => { };
export function useSelectedChannelState({ channel, selector, stateChangeEventKeys = ['all'], }) {
    const subscribe = useCallback((onStoreChange) => {
        if (!channel)
            return noop;
        const subscriptions = stateChangeEventKeys.map((et) => channel.on(et, () => {
            onStoreChange(selector(channel));
        }));
        return () => subscriptions.forEach((subscription) => subscription.unsubscribe());
    }, [channel, selector, stateChangeEventKeys]);
    const getSnapshot = useCallback(() => {
        if (!channel)
            return undefined;
        return selector(channel);
    }, [channel, selector]);
    return useSyncExternalStore(subscribe, getSnapshot);
}
