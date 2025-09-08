import React, { useRef } from 'react';
import clsx from 'clsx';
import { ChannelPreviewActionButtons as DefaultChannelPreviewActionButtons } from './ChannelPreviewActionButtons';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useComponentContext } from '../../context';
const UnMemoizedChannelPreviewMessenger = (props) => {
    const { active, Avatar = DefaultAvatar, channel, className: customClassName = '', displayImage, displayTitle, groupChannelDisplayInfo, latestMessagePreview, onSelect: customOnSelectChannel, setActiveChannel, unread, watchers, } = props;
    const { ChannelPreviewActionButtons = DefaultChannelPreviewActionButtons } = useComponentContext();
    const channelPreviewButton = useRef(null);
    const avatarName = displayTitle || channel.state.messages[channel.state.messages.length - 1]?.user?.id;
    const onSelectChannel = (e) => {
        if (customOnSelectChannel) {
            customOnSelectChannel(e);
        }
        else if (setActiveChannel) {
            setActiveChannel(channel, watchers);
        }
        if (channelPreviewButton?.current) {
            channelPreviewButton.current.blur();
        }
    };
    return (React.createElement("div", { className: 'str-chat__channel-preview-container' },
        React.createElement(ChannelPreviewActionButtons, { channel: channel }),
        React.createElement("button", { "aria-label": `Select Channel: ${displayTitle || ''}`, "aria-selected": active, className: clsx(`str-chat__channel-preview-messenger str-chat__channel-preview`, active && 'str-chat__channel-preview-messenger--active', unread && unread >= 1 && 'str-chat__channel-preview-messenger--unread', customClassName), "data-testid": 'channel-preview-button', onClick: onSelectChannel, ref: channelPreviewButton, role: 'option' },
            React.createElement("div", { className: 'str-chat__channel-preview-messenger--left' },
                React.createElement(Avatar, { className: 'str-chat__avatar--channel-preview', groupChannelDisplayInfo: groupChannelDisplayInfo, image: displayImage, name: avatarName })),
            React.createElement("div", { className: 'str-chat__channel-preview-end' },
                React.createElement("div", { className: 'str-chat__channel-preview-end-first-row' },
                    React.createElement("div", { className: 'str-chat__channel-preview-messenger--name' },
                        React.createElement("span", null, displayTitle)),
                    !!unread && (React.createElement("div", { className: 'str-chat__channel-preview-unread-badge', "data-testid": 'unread-badge' }, unread))),
                React.createElement("div", { className: 'str-chat__channel-preview-messenger--last-message' }, latestMessagePreview)))));
};
/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 * Its best suited for messenger type chat.
 */
export const ChannelPreviewMessenger = React.memo(UnMemoizedChannelPreviewMessenger);
