import clsx from 'clsx';
import React from 'react';
import { usePollContext } from '../../context';
import { useStateStore } from '../../store';
const pollStateSelectorQuotedPoll = (nextValue) => ({
    is_closed: nextValue.is_closed,
    name: nextValue.name,
});
export const QuotedPoll = () => {
    const { poll } = usePollContext();
    const { is_closed, name } = useStateStore(poll.state, pollStateSelectorQuotedPoll);
    return (React.createElement("div", { className: clsx('str-chat__quoted-poll-preview', {
            'str-chat__quoted-poll-preview--closed': is_closed,
        }) },
        React.createElement("div", { className: 'str-chat__quoted-poll-preview__icon' }, "\uD83D\uDCCA"),
        React.createElement("div", { className: 'str-chat__quoted-poll-preview__name' }, name)));
};
