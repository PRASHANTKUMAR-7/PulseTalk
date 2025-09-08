import { useEffect, useState } from 'react';
import { isVoteAnswer } from 'stream-chat';
import { useChatContext } from '../../../context';
export function useManagePollVotesRealtime(managedVoteType, cursorPaginatorState, optionId) {
    const { client } = useChatContext();
    const [votesInRealtime, setVotesInRealtime] = useState(cursorPaginatorState?.getLatestValue().items ?? []);
    useEffect(() => cursorPaginatorState?.subscribeWithSelector((state) => [state.latestPageItems], ([latestPageItems]) => setVotesInRealtime((prev) => [...prev, ...latestPageItems])), [cursorPaginatorState]);
    useEffect(() => {
        const handleVoteEvent = (event) => {
            if (!event.poll_vote)
                return;
            const isAnswer = isVoteAnswer(event.poll_vote);
            if ((managedVoteType === 'answer' && !isAnswer) ||
                (managedVoteType === 'vote' &&
                    (isAnswer || event.poll_vote.option_id !== optionId)))
                return;
            if (event.type === 'poll.vote_removed') {
                setVotesInRealtime((prev) => event.poll_vote
                    ? prev.filter((vote) => vote.id !== event.poll_vote.id)
                    : prev);
            }
            if (event.type === 'poll.vote_changed') {
                setVotesInRealtime((prev) => event.poll_vote
                    ? prev.filter((vote) => vote.id !== event.poll_vote.id)
                    : prev);
            }
            if (['poll.vote_casted', 'poll.vote_changed'].includes(event.type)) {
                setVotesInRealtime((prev) => event.poll_vote ? [event.poll_vote, ...prev] : prev);
            }
        };
        const voteCastedSubscription = client.on('poll.vote_casted', handleVoteEvent);
        const voteRemovedSubscription = client.on('poll.vote_removed', handleVoteEvent);
        const voteChangedSubscription = client.on('poll.vote_changed', handleVoteEvent);
        return () => {
            voteCastedSubscription.unsubscribe();
            voteRemovedSubscription.unsubscribe();
            voteChangedSubscription.unsubscribe();
        };
    }, [client, optionId, managedVoteType]);
    return votesInRealtime;
}
