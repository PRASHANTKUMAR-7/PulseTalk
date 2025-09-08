import React from 'react';
import { ModalHeader } from '../../Modal/ModalHeader';
import { PollVote } from '../PollVote';
import { usePollAnswerPagination } from '../hooks';
import { InfiniteScrollPaginator } from '../../InfiniteScrollPaginator/InfiniteScrollPaginator';
import { LoadingIndicator } from '../../Loading';
import { useStateStore } from '../../../store';
import { usePollContext, useTranslationContext } from '../../../context';
const pollStateSelector = (nextValue) => ({
    is_closed: nextValue.is_closed,
    ownAnswer: nextValue.ownAnswer,
});
export const PollAnswerList = ({ close, onUpdateOwnAnswerClick, }) => {
    const { t } = useTranslationContext();
    const { poll } = usePollContext();
    const { is_closed, ownAnswer } = useStateStore(poll.state, pollStateSelector);
    const { answers, error, hasNextPage, loading, loadMore } = usePollAnswerPagination();
    return (React.createElement("div", { className: 'str-chat__modal__poll-answer-list' },
        React.createElement(ModalHeader, { close: close, title: t('Poll comments') }),
        React.createElement("div", { className: 'str-chat__modal__poll-answer-list__body' },
            React.createElement(InfiniteScrollPaginator, { loadNextOnScrollToBottom: loadMore, threshold: 40 },
                React.createElement("div", { className: 'str-chat__poll-answer-list' }, answers.map((answer) => (React.createElement("div", { className: 'str-chat__poll-answer', key: `comment-${answer.id}` },
                    answer.answer_text && (React.createElement("p", { className: 'str-chat__poll-answer__text' }, answer.answer_text)),
                    React.createElement(PollVote, { key: `poll-vote-${answer.id}`, vote: answer }))))),
                hasNextPage && (React.createElement("div", { className: 'str-chat__loading-indicator-placeholder' }, loading && React.createElement(LoadingIndicator, null)))),
            error?.message && React.createElement("div", null, error?.message)),
        answers.length > 0 && !is_closed && (React.createElement("button", { className: 'str-chat__poll-action', onClick: onUpdateOwnAnswerClick }, ownAnswer ? t('Update your comment') : t('Add a comment')))));
};
