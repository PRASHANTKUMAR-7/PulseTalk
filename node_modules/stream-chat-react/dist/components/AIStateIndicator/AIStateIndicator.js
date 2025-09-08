import React from 'react';
import { AIStates, useAIState } from './hooks/useAIState';
import { useChannelStateContext, useTranslationContext } from '../../context';
export const AIStateIndicator = ({ channel: channelFromProps, }) => {
    const { t } = useTranslationContext();
    const { channel: channelFromContext } = useChannelStateContext('AIStateIndicator');
    const channel = channelFromProps || channelFromContext;
    const { aiState } = useAIState(channel);
    const allowedStates = {
        [AIStates.Thinking]: t('Thinking...'),
        [AIStates.Generating]: t('Generating...'),
    };
    return aiState in allowedStates ? (React.createElement("div", { className: 'str-chat__ai-state-indicator-container' },
        React.createElement("p", { className: 'str-chat__ai-state-indicator-text' }, allowedStates[aiState]))) : null;
};
