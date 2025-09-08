import clsx from 'clsx';
import debounce from 'lodash.debounce';
import React, { useMemo } from 'react';
import { isVoteAnswer } from 'stream-chat';
import { Avatar } from '../Avatar';
import { useChannelStateContext, useMessageContext, usePollContext, useTranslationContext, } from '../../context';
import { useStateStore } from '../../store';
export const AmountBar = ({ amount, className }) => (React.createElement("div", { className: clsx('str-chat__amount-bar', className), "data-testid": 'amount-bar', role: 'progressbar', style: {
        '--str-chat__amount-bar-fulfillment': amount + '%',
    } }));
export const Checkmark = ({ checked }) => (React.createElement("div", { className: clsx('str-chat__checkmark', { 'str-chat__checkmark--checked': checked }) }));
const pollStateSelector = (nextValue) => ({
    is_closed: nextValue.is_closed,
    latest_votes_by_option: nextValue.latest_votes_by_option,
    maxVotedOptionIds: nextValue.maxVotedOptionIds,
    ownVotesByOptionId: nextValue.ownVotesByOptionId,
    vote_counts_by_option: nextValue.vote_counts_by_option,
    voting_visibility: nextValue.voting_visibility,
});
export const PollOptionSelector = ({ displayAvatarCount, option, voteCountVerbose, }) => {
    const { t } = useTranslationContext();
    const { channelCapabilities = {} } = useChannelStateContext('PollOptionsShortlist');
    const { message } = useMessageContext();
    const { poll } = usePollContext();
    const { is_closed, latest_votes_by_option, maxVotedOptionIds, ownVotesByOptionId, vote_counts_by_option, voting_visibility, } = useStateStore(poll.state, pollStateSelector);
    const canCastVote = channelCapabilities['cast-poll-vote'] && !is_closed;
    const winningOptionCount = maxVotedOptionIds[0]
        ? vote_counts_by_option[maxVotedOptionIds[0]]
        : 0;
    const toggleVote = useMemo(() => debounce(() => {
        if (!canCastVote)
            return;
        const haveVotedForTheOption = !!ownVotesByOptionId[option.id];
        return haveVotedForTheOption
            ? poll.removeVote(ownVotesByOptionId[option.id].id, message.id)
            : poll.castVote(option.id, message.id);
    }, 100), [canCastVote, message.id, option.id, ownVotesByOptionId, poll]);
    return (React.createElement("div", { className: clsx('str-chat__poll-option', {
            'str-chat__poll-option--votable': canCastVote,
        }), key: `base-poll-option-${option.id}`, onClick: toggleVote },
        canCastVote && React.createElement(Checkmark, { checked: !!ownVotesByOptionId[option.id] }),
        React.createElement("div", { className: 'str-chat__poll-option-data' },
            React.createElement("p", { className: 'str-chat__poll-option-text' }, option.text),
            displayAvatarCount && voting_visibility === 'public' && (React.createElement("div", { className: 'str-chat__poll-option-voters' }, latest_votes_by_option?.[option.id] &&
                latest_votes_by_option[option.id]
                    .filter((vote) => !!vote.user && !isVoteAnswer(vote))
                    .slice(0, displayAvatarCount)
                    .map(({ user }) => (React.createElement(Avatar, { image: user?.image, key: `poll-option-${option.id}-avatar-${user?.id}`, name: user?.name }))))),
            React.createElement("div", { className: 'str-chat__poll-option-vote-count' }, voteCountVerbose
                ? t('{{count}} votes', {
                    count: vote_counts_by_option[option.id] ?? 0,
                })
                : (vote_counts_by_option[option.id] ?? 0))),
        React.createElement(AmountBar, { amount: (winningOptionCount &&
                (vote_counts_by_option[option.id] ?? 0) / winningOptionCount) * 100, className: clsx('str-chat__poll-option__votes-bar', {
                'str-chat__poll-option__votes-bar--winner': is_closed &&
                    maxVotedOptionIds.length === 1 &&
                    maxVotedOptionIds[0] === option.id,
            }) })));
};
