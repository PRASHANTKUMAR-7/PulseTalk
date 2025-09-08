import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Timestamp } from '../../Message/Timestamp';
import { Avatar } from '../../Avatar';
import { Icon } from '../icons';
import { UnreadCountBadge } from '../UnreadCountBadge';
import { useChannelPreviewInfo } from '../../ChannelPreview';
import { useChatContext } from '../../../context';
import { useThreadsViewContext } from '../../ChatView';
import { useThreadListItemContext } from './ThreadListItem';
import { useStateStore } from '../../../store';
/**
 * TODO:
 * - maybe hover state? ask design
 */
export const attachmentTypeIconMap = {
    audio: '🔈',
    file: '📄',
    image: '📷',
    video: '🎥',
    voiceRecording: '🎙️',
};
// TODO: translations
const getTitleFromMessage = ({ currentUserId, message, }) => {
    const attachment = message?.attachments?.at(0);
    let attachmentIcon = '';
    if (attachment) {
        attachmentIcon +=
            attachmentTypeIconMap[attachment.type ?? 'file'] ?? attachmentTypeIconMap.file;
    }
    const messageBelongsToCurrentUser = message?.user?.id === currentUserId;
    if (message?.deleted_at && message.parent_id)
        return clsx(messageBelongsToCurrentUser && 'You:', 'This reply was deleted.');
    if (message?.deleted_at && !message.parent_id)
        return clsx(messageBelongsToCurrentUser && 'You:', 'The source message was deleted.');
    if (attachment?.type === 'voiceRecording')
        return clsx(attachmentIcon, messageBelongsToCurrentUser && 'You:', 'Voice message');
    return clsx(attachmentIcon, messageBelongsToCurrentUser && 'You:', message?.text || attachment?.fallback || 'N/A');
};
export const ThreadListItemUI = (props) => {
    const { client } = useChatContext();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const thread = useThreadListItemContext();
    const selector = useCallback((nextValue) => ({
        channel: nextValue.channel,
        deletedAt: nextValue.deletedAt,
        latestReply: nextValue.replies.at(-1),
        ownUnreadMessageCount: (client.userID && nextValue.read[client.userID]?.unreadMessageCount) || 0,
        parentMessage: nextValue.parentMessage,
    }), [client]);
    const { channel, deletedAt, latestReply, ownUnreadMessageCount, parentMessage } = useStateStore(thread.state, selector);
    const { displayTitle: channelDisplayTitle } = useChannelPreviewInfo({ channel });
    const { activeThread, setActiveThread } = useThreadsViewContext();
    const avatarProps = deletedAt ? null : latestReply?.user;
    return (React.createElement("button", { "aria-selected": activeThread === thread, className: 'str-chat__thread-list-item', "data-thread-id": thread.id, onClick: () => setActiveThread(thread), role: 'option', ...props },
        React.createElement("div", { className: 'str-chat__thread-list-item__channel' },
            React.createElement(Icon.MessageBubble, null),
            React.createElement("div", { className: 'str-chat__thread-list-item__channel-text' }, channelDisplayTitle)),
        React.createElement("div", { className: 'str-chat__thread-list-item__parent-message' },
            React.createElement("div", { className: 'str-chat__thread-list-item__parent-message-text' },
                "replied to: ",
                getTitleFromMessage({ message: parentMessage })),
            !deletedAt && React.createElement(UnreadCountBadge, { count: ownUnreadMessageCount })),
        React.createElement("div", { className: 'str-chat__thread-list-item__latest-reply' },
            React.createElement(Avatar, { ...avatarProps }),
            React.createElement("div", { className: 'str-chat__thread-list-item__latest-reply-details' },
                !deletedAt && (React.createElement("div", { className: 'str-chat__thread-list-item__latest-reply-created-by' }, latestReply?.user?.name || latestReply?.user?.id || 'Unknown sender')),
                React.createElement("div", { className: 'str-chat__thread-list-item__latest-reply-text-and-timestamp' },
                    React.createElement("div", { className: 'str-chat__thread-list-item__latest-reply-text' }, deletedAt
                        ? 'This thread was deleted'
                        : getTitleFromMessage({
                            currentUserId: client.user?.id,
                            message: latestReply,
                        })),
                    React.createElement("div", { className: 'str-chat__thread-list-item__latest-reply-timestamp' },
                        React.createElement(Timestamp, { timestamp: deletedAt ?? latestReply?.created_at })))))));
};
