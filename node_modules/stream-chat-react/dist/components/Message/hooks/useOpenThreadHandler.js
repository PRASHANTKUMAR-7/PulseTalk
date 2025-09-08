import { useChannelActionContext } from '../../../context/ChannelActionContext';
export const useOpenThreadHandler = (message, customOpenThread) => {
    const { openThread: channelOpenThread } = useChannelActionContext('useOpenThreadHandler');
    const openThread = customOpenThread || channelOpenThread;
    return (event) => {
        if (!openThread || !message) {
            console.warn('Open thread handler was called but it is missing one of its parameters');
            return;
        }
        openThread(message, event);
    };
};
