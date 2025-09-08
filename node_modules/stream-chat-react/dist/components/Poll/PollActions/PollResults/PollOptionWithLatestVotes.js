import React from 'react';
import { PollOptionWithVotesHeader } from './PollOptionWithVotesHeader';
import { PollVoteListing } from '../../PollVote';
import { useStateStore } from '../../../../store';
import { useChannelStateContext, usePollContext, useTranslationContext, } from '../../../../context';
const pollStateSelector = (nextValue) => ({
    latest_votes_by_option: nextValue.latest_votes_by_option,
});
export const PollOptionWithLatestVotes = ({ countVotesPreview = 5, option, showAllVotes, }) => {
    const { t } = useTranslationContext();
    const { channelCapabilities = {} } = useChannelStateContext('PollOptionWithLatestVotes');
    const { poll } = usePollContext();
    const { latest_votes_by_option } = useStateStore(poll.state, pollStateSelector);
    const votes = latest_votes_by_option && latest_votes_by_option[option.id];
    return (React.createElement("div", { className: 'str-chat__poll-option' },
        React.createElement(PollOptionWithVotesHeader, { option: option }),
        votes && React.createElement(PollVoteListing, { votes: votes.slice(0, countVotesPreview) }),
        channelCapabilities['query-poll-votes'] &&
            showAllVotes &&
            votes?.length > countVotesPreview && (React.createElement("button", { className: 'str-chat__poll-option__show-all-votes-button', onClick: showAllVotes }, t('Show all')))));
};
