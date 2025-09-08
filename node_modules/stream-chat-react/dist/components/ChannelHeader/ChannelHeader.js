import React from 'react';
import { MenuIcon as DefaultMenuIcon } from './icons';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useChannelPreviewInfo } from '../ChannelPreview/hooks/useChannelPreviewInfo';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useChatContext } from '../../context/ChatContext';
import { useTranslationContext } from '../../context/TranslationContext';
/**
 * The ChannelHeader component renders some basic information about a Channel.
 */
export const ChannelHeader = (props) => {
    const { Avatar = DefaultAvatar, image: overrideImage, live, MenuIcon = DefaultMenuIcon, title: overrideTitle, } = props;
    const { channel, watcher_count } = useChannelStateContext('ChannelHeader');
    const { openMobileNav } = useChatContext('ChannelHeader');
    const { t } = useTranslationContext('ChannelHeader');
    const { displayImage, displayTitle, groupChannelDisplayInfo } = useChannelPreviewInfo({
        channel,
        overrideImage,
        overrideTitle,
    });
    const { member_count, subtitle } = channel?.data || {};
    return (React.createElement("div", { className: 'str-chat__channel-header' },
        React.createElement("button", { "aria-label": t('aria/Menu'), className: 'str-chat__header-hamburger', onClick: openMobileNav },
            React.createElement(MenuIcon, null)),
        React.createElement(Avatar, { className: 'str-chat__avatar--channel-header', groupChannelDisplayInfo: groupChannelDisplayInfo, image: displayImage, name: displayTitle }),
        React.createElement("div", { className: 'str-chat__channel-header-end' },
            React.createElement("p", { className: 'str-chat__channel-header-title' },
                displayTitle,
                ' ',
                live && (React.createElement("span", { className: 'str-chat__header-livestream-livelabel' }, t('live')))),
            subtitle && React.createElement("p", { className: 'str-chat__channel-header-subtitle' }, subtitle),
            React.createElement("p", { className: 'str-chat__channel-header-info' },
                !live && !!member_count && member_count > 0 && (React.createElement(React.Fragment, null,
                    t('{{ memberCount }} members', {
                        memberCount: member_count,
                    }),
                    ",",
                    ' ')),
                t('{{ watcherCount }} online', { watcherCount: watcher_count })))));
};
