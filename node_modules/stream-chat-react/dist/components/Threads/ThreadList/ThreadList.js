import React, { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ThreadListItem as DefaultThreadListItem } from './ThreadListItem';
import { ThreadListEmptyPlaceholder as DefaultThreadListEmptyPlaceholder } from './ThreadListEmptyPlaceholder';
import { ThreadListUnseenThreadsBanner as DefaultThreadListUnseenThreadsBanner } from './ThreadListUnseenThreadsBanner';
import { ThreadListLoadingIndicator as DefaultThreadListLoadingIndicator } from './ThreadListLoadingIndicator';
import { useChatContext, useComponentContext } from '../../../context';
import { useStateStore } from '../../../store';
const selector = (nextValue) => ({ threads: nextValue.threads });
const computeItemKey = (_, item) => item.id;
export const useThreadList = () => {
    const { client } = useChatContext();
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                client.threads.activate();
            }
            if (document.visibilityState === 'hidden') {
                client.threads.deactivate();
            }
        };
        handleVisibilityChange();
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            client.threads.deactivate();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [client]);
};
export const ThreadList = ({ virtuosoProps }) => {
    const { client } = useChatContext();
    const { ThreadListEmptyPlaceholder = DefaultThreadListEmptyPlaceholder, ThreadListItem = DefaultThreadListItem, ThreadListLoadingIndicator = DefaultThreadListLoadingIndicator, ThreadListUnseenThreadsBanner = DefaultThreadListUnseenThreadsBanner, } = useComponentContext();
    const { threads } = useStateStore(client.threads.state, selector);
    useThreadList();
    return (React.createElement("div", { className: 'str-chat__thread-list-container' },
        React.createElement(ThreadListUnseenThreadsBanner, null),
        React.createElement(Virtuoso, { atBottomStateChange: (atBottom) => atBottom && client.threads.loadNextPage(), className: 'str-chat__thread-list', components: {
                EmptyPlaceholder: ThreadListEmptyPlaceholder,
                Footer: ThreadListLoadingIndicator,
            }, computeItemKey: computeItemKey, data: threads, itemContent: (_, thread) => React.createElement(ThreadListItem, { thread: thread }), ...virtuosoProps })));
};
