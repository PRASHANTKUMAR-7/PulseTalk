import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import { ChatBubble } from './icons';
const UnMemoizedEmptyStateIndicator = (props) => {
    const { listType } = props;
    const { t } = useTranslationContext('EmptyStateIndicator');
    if (listType === 'thread')
        return null;
    if (listType === 'channel') {
        const text = t('You have no channels currently');
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'str-chat__channel-list-empty' },
                React.createElement(ChatBubble, null),
                React.createElement("p", { role: 'listitem' }, text))));
    }
    if (listType === 'message') {
        const text = t('No chats here yet…');
        return (React.createElement("div", { className: 'str-chat__empty-channel' },
            React.createElement(ChatBubble, null),
            React.createElement("p", { className: 'str-chat__empty-channel-text', role: 'listitem' }, text)));
    }
    return React.createElement("p", null, "No items exist");
};
export const EmptyStateIndicator = React.memo(UnMemoizedEmptyStateIndicator);
