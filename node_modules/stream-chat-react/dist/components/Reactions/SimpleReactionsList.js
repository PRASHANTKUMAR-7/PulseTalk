import React, { useState } from 'react';
import clsx from 'clsx';
import { useMessageContext } from '../../context/MessageContext';
import { useProcessReactions } from './hooks/useProcessReactions';
import { useEnterLeaveHandlers } from '../Tooltip/hooks';
import { PopperTooltip } from '../Tooltip';
const WithTooltip = ({ children, onMouseEnter, onMouseLeave, title, }) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const { handleEnter, handleLeave, tooltipVisible } = useEnterLeaveHandlers({
        onMouseEnter,
        onMouseLeave,
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(PopperTooltip, { referenceElement: referenceElement, visible: tooltipVisible }, title),
        React.createElement("span", { onMouseEnter: handleEnter, onMouseLeave: handleLeave, ref: setReferenceElement }, children)));
};
const UnMemoizedSimpleReactionsList = (props) => {
    const { handleReaction: propHandleReaction, ...rest } = props;
    const { handleReaction: contextHandleReaction } = useMessageContext('SimpleReactionsList');
    const { existingReactions, hasReactions, totalReactionCount } = useProcessReactions(rest);
    const handleReaction = propHandleReaction || contextHandleReaction;
    if (!hasReactions)
        return null;
    return (React.createElement("div", { className: 'str-chat__message-reactions-container' },
        React.createElement("ul", { className: 'str-chat__simple-reactions-list str-chat__message-reactions', "data-testid": 'simple-reaction-list' },
            existingReactions.map(({ EmojiComponent, isOwnReaction, latestReactedUserNames, reactionType }) => {
                const tooltipContent = latestReactedUserNames.join(', ');
                return (EmojiComponent && (React.createElement("li", { className: clsx('str-chat__simple-reactions-list-item', {
                        'str-chat__message-reaction-own': isOwnReaction,
                    }), key: reactionType, onClick: (event) => handleReaction(reactionType, event), onKeyUp: (event) => handleReaction(reactionType, event) },
                    React.createElement(WithTooltip, { title: tooltipContent },
                        React.createElement(EmojiComponent, null)))));
            }),
            React.createElement("li", { className: 'str-chat__simple-reactions-list-item--last-number' }, totalReactionCount))));
};
export const SimpleReactionsList = React.memo(UnMemoizedSimpleReactionsList);
