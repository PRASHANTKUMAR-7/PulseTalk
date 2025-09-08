import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
const UnMemoizedMessageRepliesCountButton = (props) => {
    const { labelPlural, labelSingle, onClick, reply_count = 0 } = props;
    const { t } = useTranslationContext('MessageRepliesCountButton');
    if (!reply_count)
        return null;
    let replyCountText = t('replyCount', { count: reply_count });
    if (labelPlural && reply_count > 1) {
        replyCountText = `${reply_count} ${labelPlural}`;
    }
    else if (labelSingle) {
        replyCountText = `1 ${labelSingle}`;
    }
    return (React.createElement("div", { className: 'str-chat__message-replies-count-button-wrapper' },
        React.createElement("button", { className: 'str-chat__message-replies-count-button', "data-testid": 'replies-count-button', onClick: onClick }, replyCountText)));
};
export const MessageRepliesCountButton = React.memo(UnMemoizedMessageRepliesCountButton);
