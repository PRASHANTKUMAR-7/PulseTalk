import { useChatContext } from '../../../context/ChatContext';
export const useEditMessageHandler = (doUpdateMessageRequest) => {
    const { channel, client } = useChatContext('useEditMessageHandler');
    return (updatedMessage, options) => {
        if (doUpdateMessageRequest && channel) {
            return Promise.resolve(doUpdateMessageRequest(channel.cid, updatedMessage, options));
        }
        return client.updateMessage(updatedMessage, undefined, options);
    };
};
