import React from 'react';
const LoadingMessage = () => (React.createElement("div", { className: 'str-chat__loading-channel-message' },
    React.createElement("div", { className: 'str-chat__loading-channel-message-avatar' }),
    React.createElement("div", { className: 'str-chat__loading-channel-message-end' },
        React.createElement("div", { className: 'str-chat__loading-channel-message-sender' }),
        React.createElement("div", { className: 'str-chat__loading-channel-message-last-row' },
            React.createElement("div", { className: 'str-chat__loading-channel-message-text' }),
            React.createElement("div", { className: 'str-chat__loading-channel-message-date' })))));
const LoadingMessageInput = () => (React.createElement("div", { className: 'str-chat__loading-channel-message-input-row' },
    React.createElement("div", { className: 'str-chat__loading-channel-message-input' }),
    React.createElement("div", { className: 'str-chat__loading-channel-message-send' })));
const LoadingChannelHeader = () => (React.createElement("div", { className: 'str-chat__loading-channel-header' },
    React.createElement("div", { className: 'str-chat__loading-channel-header-avatar' }),
    React.createElement("div", { className: 'str-chat__loading-channel-header-end' },
        React.createElement("div", { className: 'str-chat__loading-channel-header-name' }),
        React.createElement("div", { className: 'str-chat__loading-channel-header-info' }))));
export const LoadingChannel = () => (React.createElement("div", { className: 'str-chat__loading-channel' },
    React.createElement(LoadingChannelHeader, null),
    React.createElement("div", { className: 'str-chat__loading-channel-message-list' }, Array.from(Array(3)).map((_, i) => (React.createElement(LoadingMessage, { key: `loading-message-${i}` })))),
    React.createElement(LoadingMessageInput, null)));
