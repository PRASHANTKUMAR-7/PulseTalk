import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useDialog } from '../Dialog';
import { defaultReactionOptions } from './reactionOptions';
import { isMutableRef } from './utils/utils';
import { useComponentContext } from '../../context/ComponentContext';
import { useMessageContext } from '../../context/MessageContext';
const UnMemoizedReactionSelector = (props) => {
    const { Avatar: propAvatar, detailedView = true, handleReaction: propHandleReaction, latest_reactions: propLatestReactions, own_reactions: propOwnReactions, reaction_groups: propReactionGroups, reactionOptions: propReactionOptions, reverse = false, } = props;
    const { Avatar: contextAvatar, reactionOptions: contextReactionOptions = defaultReactionOptions, } = useComponentContext('ReactionSelector');
    const { closeReactionSelectorOnClick, handleReaction: contextHandleReaction, message, } = useMessageContext('ReactionSelector');
    const dialogId = `reaction-selector--${message.id}`;
    const dialog = useDialog({ id: dialogId });
    const reactionOptions = propReactionOptions ?? contextReactionOptions;
    const Avatar = propAvatar || contextAvatar || DefaultAvatar;
    const handleReaction = propHandleReaction || contextHandleReaction;
    const latestReactions = propLatestReactions || message?.latest_reactions || [];
    const ownReactions = propOwnReactions || message?.own_reactions || [];
    const reactionGroups = propReactionGroups || message?.reaction_groups || {};
    const [tooltipReactionType, setTooltipReactionType] = useState(null);
    const [tooltipPositions, setTooltipPositions] = useState(null);
    const rootRef = useRef(null);
    const targetRef = useRef(null);
    const tooltipRef = useRef(null);
    const showTooltip = useCallback((event, reactionType) => {
        targetRef.current = event.currentTarget;
        setTooltipReactionType(reactionType);
    }, []);
    const hideTooltip = useCallback(() => {
        setTooltipReactionType(null);
        setTooltipPositions(null);
    }, []);
    useEffect(() => {
        if (!tooltipReactionType || !rootRef.current)
            return;
        const tooltip = tooltipRef.current?.getBoundingClientRect();
        const target = targetRef.current?.getBoundingClientRect();
        const container = isMutableRef(rootRef)
            ? rootRef.current?.getBoundingClientRect()
            : null;
        if (!tooltip || !target || !container)
            return;
        const tooltipPosition = tooltip.width === container.width || tooltip.x < container.x
            ? 0
            : target.left + target.width / 2 - container.left - tooltip.width / 2;
        const arrowPosition = target.x - tooltip.x + target.width / 2 - tooltipPosition;
        setTooltipPositions({
            arrow: arrowPosition,
            tooltip: tooltipPosition,
        });
    }, [tooltipReactionType, rootRef]);
    const getUsersPerReactionType = (type) => latestReactions
        .map((reaction) => {
        if (reaction.type === type) {
            return reaction.user?.name || reaction.user?.id;
        }
        return null;
    })
        .filter(Boolean);
    const iHaveReactedWithReaction = (reactionType) => ownReactions.find((reaction) => reaction.type === reactionType);
    const getLatestUserForReactionType = (type) => latestReactions.find((reaction) => reaction.type === type && !!reaction.user)?.user ||
        undefined;
    return (React.createElement("div", { className: clsx('str-chat__reaction-selector str-chat__message-reaction-selector str-chat-react__message-reaction-selector', {
            'str-chat__reaction-selector--reverse': reverse,
        }), "data-testid": 'reaction-selector', ref: rootRef },
        !!tooltipReactionType && detailedView && (React.createElement("div", { className: 'str-chat__reaction-selector-tooltip', ref: tooltipRef, style: {
                left: tooltipPositions?.tooltip,
                visibility: tooltipPositions ? 'visible' : 'hidden',
            } },
            React.createElement("div", { className: 'arrow', style: { left: tooltipPositions?.arrow } }),
            getUsersPerReactionType(tooltipReactionType)?.map((user, i, users) => (React.createElement("span", { className: 'latest-user-username', key: `key-${i}-${user}` }, `${user}${i < users.length - 1 ? ', ' : ''}`))))),
        React.createElement("ul", { className: 'str-chat__message-reactions-list str-chat__message-reactions-options' }, reactionOptions.map(({ Component, name: reactionName, type: reactionType }) => {
            const latestUser = getLatestUserForReactionType(reactionType);
            const count = reactionGroups[reactionType]?.count ?? 0;
            return (React.createElement("li", { key: reactionType },
                React.createElement("button", { "aria-label": `Select Reaction: ${reactionName || reactionType}`, className: clsx('str-chat__message-reactions-list-item str-chat__message-reactions-option', {
                        'str-chat__message-reactions-option-selected': iHaveReactedWithReaction(reactionType),
                    }), "data-testid": 'select-reaction-button', "data-text": reactionType, onClick: (event) => {
                        handleReaction(reactionType, event);
                        if (closeReactionSelectorOnClick) {
                            dialog.close();
                        }
                    } },
                    !!count && detailedView && (React.createElement("div", { className: 'latest-user str-chat__message-reactions-last-user', onClick: hideTooltip, onMouseEnter: (e) => showTooltip(e, reactionType), onMouseLeave: hideTooltip }, latestUser ? (React.createElement(Avatar, { image: latestUser.image, name: latestUser.name, size: 20, user: latestUser })) : (React.createElement("div", { className: 'latest-user-not-found' })))),
                    React.createElement("span", { className: 'str-chat__message-reaction-emoji' },
                        React.createElement(Component, null)),
                    Boolean(count) && detailedView && (React.createElement("span", { className: 'str-chat__message-reactions-list-item__count' }, count || '')))));
        }))));
};
/**
 * Component that allows a user to select a reaction.
 */
export const ReactionSelector = React.memo(UnMemoizedReactionSelector);
