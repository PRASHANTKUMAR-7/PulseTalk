import React from 'react';
import { LoadingIndicator as DefaultLoadingIndicator } from '../../Loading';
import { useChatContext, useComponentContext } from '../../../context';
import { useStateStore } from '../../../store';
const selector = (nextValue) => ({
    isLoadingNext: nextValue.pagination.isLoadingNext,
});
export const ThreadListLoadingIndicator = () => {
    const { LoadingIndicator = DefaultLoadingIndicator } = useComponentContext();
    const { client } = useChatContext();
    const { isLoadingNext } = useStateStore(client.threads.state, selector);
    if (!isLoadingNext)
        return null;
    return (React.createElement("div", { className: 'str-chat__thread-list-loading-indicator' },
        React.createElement(LoadingIndicator, null)));
};
