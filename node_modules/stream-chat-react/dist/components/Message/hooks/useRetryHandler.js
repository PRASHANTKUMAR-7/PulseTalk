import { useChannelActionContext } from '../../../context/ChannelActionContext';
export const useRetryHandler = (customRetrySendMessage) => {
    const { retrySendMessage: contextRetrySendMessage } = useChannelActionContext('useRetryHandler');
    const retrySendMessage = customRetrySendMessage || contextRetrySendMessage;
    return async (message) => {
        if (message) {
            await retrySendMessage(message);
        }
    };
};
