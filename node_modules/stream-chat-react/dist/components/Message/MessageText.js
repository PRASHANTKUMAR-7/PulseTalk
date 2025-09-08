import clsx from 'clsx';
import React, { useMemo } from 'react';
import { QuotedMessage as DefaultQuotedMessage } from './QuotedMessage';
import { isOnlyEmojis, messageHasAttachments } from './utils';
import { useComponentContext, useMessageContext, useTranslationContext, } from '../../context';
import { renderText as defaultRenderText } from './renderText';
import { MessageErrorText } from './MessageErrorText';
const UnMemoizedMessageTextComponent = (props) => {
    const { customInnerClass, customWrapperClass = '', message: propMessage, renderText: propsRenderText, theme = 'simple', } = props;
    const { QuotedMessage = DefaultQuotedMessage } = useComponentContext('MessageText');
    const { message: contextMessage, onMentionsClickMessage, onMentionsHoverMessage, renderText: contextRenderText, unsafeHTML, } = useMessageContext('MessageText');
    const renderText = propsRenderText ?? contextRenderText ?? defaultRenderText;
    const { userLanguage } = useTranslationContext('MessageText');
    const message = propMessage || contextMessage;
    const hasAttachment = messageHasAttachments(message);
    const messageTextToRender = message.i18n?.[`${userLanguage}_text`] ||
        message.text;
    const messageText = useMemo(() => renderText(messageTextToRender, message.mentioned_users), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [message.mentioned_users, messageTextToRender]);
    const wrapperClass = customWrapperClass || 'str-chat__message-text';
    const innerClass = customInnerClass ||
        `str-chat__message-text-inner str-chat__message-${theme}-text-inner`;
    if (!messageTextToRender && !message.quoted_message)
        return null;
    return (React.createElement("div", { className: wrapperClass, tabIndex: 0 },
        React.createElement("div", { className: clsx(innerClass, {
                [`str-chat__message-${theme}-text-inner--has-attachment`]: hasAttachment,
                [` str-chat__message-${theme}-text-inner--is-emoji`]: isOnlyEmojis(message.text) && !message.quoted_message,
            }), "data-testid": 'message-text-inner-wrapper', onClick: onMentionsClickMessage, onMouseOver: onMentionsHoverMessage },
            message.quoted_message && React.createElement(QuotedMessage, null),
            React.createElement(MessageErrorText, { message: message, theme: theme }),
            unsafeHTML && message.html ? (React.createElement("div", { dangerouslySetInnerHTML: { __html: message.html } })) : (React.createElement("div", null, messageText)))));
};
export const MessageText = React.memo(UnMemoizedMessageTextComponent);
