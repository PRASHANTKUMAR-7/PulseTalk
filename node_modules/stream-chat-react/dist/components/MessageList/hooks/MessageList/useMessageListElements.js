import { useMemo } from 'react';
import { useLastReadData } from '../useLastReadData';
import { getLastReceived } from '../../utils';
import { useChatContext } from '../../../../context/ChatContext';
import { useComponentContext } from '../../../../context/ComponentContext';
export const useMessageListElements = (props) => {
    const { channelUnreadUiState, enrichedMessages, internalMessageProps, messageGroupStyles, read, renderMessages, returnAllReadData, threadList, } = props;
    const { client, customClasses } = useChatContext('useMessageListElements');
    const components = useComponentContext('useMessageListElements');
    // get the readData, but only for messages submitted by the user themselves
    const readData = useLastReadData({
        messages: enrichedMessages,
        read,
        returnAllReadData,
        userID: client.userID,
    });
    const lastReceivedMessageId = useMemo(() => getLastReceived(enrichedMessages), [enrichedMessages]);
    const elements = useMemo(() => renderMessages({
        channelUnreadUiState,
        components,
        customClasses,
        lastReceivedMessageId,
        messageGroupStyles,
        messages: enrichedMessages,
        readData,
        sharedMessageProps: { ...internalMessageProps, threadList },
    }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        enrichedMessages,
        internalMessageProps,
        lastReceivedMessageId,
        messageGroupStyles,
        channelUnreadUiState,
        readData,
        renderMessages,
        threadList,
    ]);
    return elements;
};
