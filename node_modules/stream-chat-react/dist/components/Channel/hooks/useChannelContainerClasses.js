import { useChatContext } from '../../../context/ChatContext';
export const useImageFlagEmojisOnWindowsClass = () => {
    const { useImageFlagEmojisOnWindows } = useChatContext('Channel');
    return useImageFlagEmojisOnWindows && navigator.userAgent.match(/Win/)
        ? 'str-chat--windows-flags'
        : '';
};
export const getChatContainerClass = (customClass) => customClass ?? 'str-chat__container';
export const useChannelContainerClasses = ({ customClasses, }) => {
    const windowsEmojiClass = useImageFlagEmojisOnWindowsClass();
    return {
        channelClass: customClasses?.channel ?? 'str-chat__channel',
        chatClass: customClasses?.chat ?? 'str-chat',
        chatContainerClass: getChatContainerClass(customClasses?.chatContainer),
        windowsEmojiClass,
    };
};
