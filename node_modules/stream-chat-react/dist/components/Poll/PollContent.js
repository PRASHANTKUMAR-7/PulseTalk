import clsx from 'clsx';
import React from 'react';
import { PollHeader as DefaultPollHeader } from './PollHeader';
import { PollActions as DefaultPollActions } from './PollActions';
import { PollOptionList } from './PollOptionList';
import { MAX_OPTIONS_DISPLAYED } from './constants';
import { useComponentContext, usePollContext } from '../../context';
import { useStateStore } from '../../store';
const pollStateSelectorPollContent = (nextValue) => ({ is_closed: nextValue.is_closed });
export const PollContent = () => {
    const { PollActions = DefaultPollActions, PollHeader = DefaultPollHeader } = useComponentContext();
    const { poll } = usePollContext();
    const { is_closed } = useStateStore(poll.state, pollStateSelectorPollContent);
    return (React.createElement("div", { className: clsx('str-chat__poll', { 'str-chat__poll--closed': is_closed }) },
        React.createElement(PollHeader, null),
        React.createElement(PollOptionList, { optionsDisplayCount: MAX_OPTIONS_DISPLAYED }),
        React.createElement(PollActions, null)));
};
