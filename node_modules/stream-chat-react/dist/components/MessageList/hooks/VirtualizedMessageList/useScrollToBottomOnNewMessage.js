import { useEffect, useRef, useState } from 'react';
export const useScrollToBottomOnNewMessage = ({ messages, scrollToBottom, scrollToLatestMessageOnFocus, }) => {
    const [newMessagesReceivedInBackground, setNewMessagesReceivedInBackground] = useState(false);
    const scrollToBottomIfConfigured = useRef(undefined);
    scrollToBottomIfConfigured.current = (event) => {
        if (!scrollToLatestMessageOnFocus ||
            !newMessagesReceivedInBackground ||
            event.target !== window) {
            return;
        }
        setTimeout(scrollToBottom, 100);
    };
    useEffect(() => {
        setNewMessagesReceivedInBackground(true);
    }, [messages]);
    useEffect(() => {
        const handleFocus = (event) => {
            scrollToBottomIfConfigured.current?.(event);
        };
        const handleBlur = () => {
            setNewMessagesReceivedInBackground(false);
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('focus', handleFocus);
            window.addEventListener('blur', handleBlur);
        }
        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);
};
