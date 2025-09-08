import React from 'react';
const LoadingItems = () => (React.createElement("div", { className: 'str-chat__loading-channels-item str-chat__channel-preview-loading' },
    React.createElement("div", { className: 'str-chat__loading-channels-avatar' }),
    React.createElement("div", { className: 'str-chat__loading-channels-meta str-chat__channel-preview-end-loading' },
        React.createElement("div", { className: 'str-chat__loading-channels-username' }),
        React.createElement("div", { className: 'str-chat__loading-channels-status' }))));
const UnMemoizedLoadingChannels = () => (React.createElement("div", { className: 'str-chat__loading-channels' },
    React.createElement(LoadingItems, null),
    React.createElement(LoadingItems, null),
    React.createElement(LoadingItems, null)));
/**
 * Loading indicator for the ChannelList
 */
export const LoadingChannels = React.memo(UnMemoizedLoadingChannels);
