import React, { useState } from 'react';
import clsx from 'clsx';
import { MessageDeliveredIcon } from './icons';
import { getReadByTooltipText, mapToUserNameOrId } from './utils';
import { Avatar as DefaultAvatar } from '../Avatar';
import { LoadingIndicator } from '../Loading';
import { PopperTooltip } from '../Tooltip';
import { useEnterLeaveHandlers } from '../Tooltip/hooks';
import { useChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { useMessageContext } from '../../context/MessageContext';
import { useTranslationContext } from '../../context/TranslationContext';
const UnMemoizedMessageStatus = (props) => {
    const { Avatar: propAvatar, MessageDeliveredStatus, MessageReadStatus, MessageSendingStatus, messageType = 'simple', tooltipUserNameMapper = mapToUserNameOrId, } = props;
    const { handleEnter, handleLeave, tooltipVisible } = useEnterLeaveHandlers();
    const { client } = useChatContext('MessageStatus');
    const { Avatar: contextAvatar } = useComponentContext('MessageStatus');
    const { isMyMessage, lastReceivedId, message, readBy, threadList } = useMessageContext('MessageStatus');
    const { t } = useTranslationContext('MessageStatus');
    const [referenceElement, setReferenceElement] = useState(null);
    const Avatar = propAvatar || contextAvatar || DefaultAvatar;
    if (!isMyMessage() || message.type === 'error')
        return null;
    const justReadByMe = readBy?.length === 1 && readBy[0].id === client.user?.id;
    const rootClassName = `str-chat__message-${messageType}-status str-chat__message-status`;
    const sending = message.status === 'sending';
    const delivered = message.status === 'received' && message.id === lastReceivedId && !threadList;
    const deliveredAndRead = !!(readBy?.length && !threadList && !justReadByMe);
    const readersWithoutOwnUser = deliveredAndRead
        ? readBy.filter((item) => item.id !== client.user?.id)
        : [];
    const [lastReadUser] = readersWithoutOwnUser;
    return (React.createElement("span", { className: rootClassName, "data-testid": clsx({
            'message-status-read-by': deliveredAndRead,
            'message-status-received': delivered && !deliveredAndRead,
            'message-status-sending': sending,
        }), onMouseEnter: handleEnter, onMouseLeave: handleLeave, ref: setReferenceElement },
        sending &&
            (MessageSendingStatus ? (React.createElement(MessageSendingStatus, null)) : (React.createElement(React.Fragment, null,
                React.createElement(PopperTooltip, { offset: [0, 5], referenceElement: referenceElement, visible: tooltipVisible }, t('Sending...')),
                React.createElement(LoadingIndicator, null)))),
        delivered &&
            !deliveredAndRead &&
            (MessageDeliveredStatus ? (React.createElement(MessageDeliveredStatus, null)) : (React.createElement(React.Fragment, null,
                React.createElement(PopperTooltip, { offset: [0, 5], referenceElement: referenceElement, visible: tooltipVisible }, t('Delivered')),
                React.createElement(MessageDeliveredIcon, null)))),
        deliveredAndRead &&
            (MessageReadStatus ? (React.createElement(MessageReadStatus, null)) : (React.createElement(React.Fragment, null,
                React.createElement(PopperTooltip, { offset: [0, 5], referenceElement: referenceElement, visible: tooltipVisible }, getReadByTooltipText(readBy, t, client, tooltipUserNameMapper)),
                React.createElement(Avatar, { className: 'str-chat__avatar--message-status', image: lastReadUser.image, name: lastReadUser.name || lastReadUser.id, user: lastReadUser }),
                readersWithoutOwnUser.length > 1 && (React.createElement("span", { className: `str-chat__message-${messageType}-status-number`, "data-testid": 'message-status-read-by-many' }, readersWithoutOwnUser.length)))))));
};
export const MessageStatus = React.memo(UnMemoizedMessageStatus);
