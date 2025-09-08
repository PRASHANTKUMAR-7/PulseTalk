import { useChannelActionContext } from '../../../context/ChannelActionContext';
function createEventHandler(fn, message) {
    return (event) => {
        if (typeof fn !== 'function' || !message?.mentioned_users?.length) {
            return;
        }
        fn(event, message.mentioned_users);
    };
}
export const useMentionsHandler = (message, customMentionHandler) => {
    const { onMentionsClick: contextOnMentionsClick, onMentionsHover: contextOnMentionsHover, } = useChannelActionContext('useMentionsHandler');
    const onMentionsClick = customMentionHandler?.onMentionsClick || contextOnMentionsClick || (() => null);
    const onMentionsHover = customMentionHandler?.onMentionsHover || contextOnMentionsHover || (() => null);
    return {
        onMentionsClick: createEventHandler(onMentionsClick, message),
        onMentionsHover: createEventHandler(onMentionsHover, message),
    };
};
