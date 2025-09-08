import React from 'react';
import { Icon } from '../icons';
import { useChatContext } from '../../../context';
import { useStateStore } from '../../../store';
const selector = (nextValue) => ({
    unseenThreadIds: nextValue.unseenThreadIds,
});
export const ThreadListUnseenThreadsBanner = () => {
    const { client } = useChatContext();
    const { unseenThreadIds } = useStateStore(client.threads.state, selector);
    if (!unseenThreadIds.length)
        return null;
    return (React.createElement("div", { className: 'str-chat__unseen-threads-banner' },
        unseenThreadIds.length,
        " unread threads",
        React.createElement("button", { className: 'str-chat__unseen-threads-banner__button', onClick: () => client.threads.reload() },
            React.createElement(Icon.Reload, null))));
};
