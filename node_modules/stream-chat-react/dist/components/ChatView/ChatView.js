import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThreadProvider } from '../Threads';
import { Icon } from '../Threads/icons';
import { UnreadCountBadge } from '../Threads/UnreadCountBadge';
import { useChatContext } from '../../context';
import { useStateStore } from '../../store';
import clsx from 'clsx';
const ChatViewContext = createContext({
    activeChatView: 'channels',
    setActiveChatView: () => undefined,
});
export const ChatView = ({ children }) => {
    const [activeChatView, setActiveChatView] = useState('channels');
    const { theme } = useChatContext();
    const value = useMemo(() => ({ activeChatView, setActiveChatView }), [activeChatView]);
    return (React.createElement(ChatViewContext.Provider, { value: value },
        React.createElement("div", { className: clsx('str-chat', theme, 'str-chat__chat-view') }, children)));
};
const ChannelsView = ({ children }) => {
    const { activeChatView } = useContext(ChatViewContext);
    if (activeChatView !== 'channels')
        return null;
    return React.createElement("div", { className: 'str-chat__chat-view__channels' }, children);
};
const ThreadsViewContext = createContext({
    activeThread: undefined,
    setActiveThread: () => undefined,
});
export const useThreadsViewContext = () => useContext(ThreadsViewContext);
const ThreadsView = ({ children }) => {
    const { activeChatView } = useContext(ChatViewContext);
    const [activeThread, setActiveThread] = useState(undefined);
    const value = useMemo(() => ({ activeThread, setActiveThread }), [activeThread]);
    if (activeChatView !== 'threads')
        return null;
    return (React.createElement(ThreadsViewContext.Provider, { value: value },
        React.createElement("div", { className: 'str-chat__chat-view__threads' }, children)));
};
// thread business logic that's impossible to keep within client but encapsulated for ease of use
export const useActiveThread = ({ activeThread }) => {
    useEffect(() => {
        if (!activeThread)
            return;
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && document.hasFocus()) {
                activeThread.activate();
            }
            if (document.visibilityState === 'hidden' || !document.hasFocus()) {
                activeThread.deactivate();
            }
        };
        handleVisibilityChange();
        window.addEventListener('focus', handleVisibilityChange);
        window.addEventListener('blur', handleVisibilityChange);
        return () => {
            activeThread.deactivate();
            window.addEventListener('blur', handleVisibilityChange);
            window.removeEventListener('focus', handleVisibilityChange);
        };
    }, [activeThread]);
};
// ThreadList under View.Threads context, will access setting function and on item click will set activeThread
// which can be accessed for the ease of use by ThreadAdapter which forwards it to required ThreadProvider
// ThreadList can easily live without this context and click handler can be overriden, ThreadAdapter is then no longer needed
/**
 * // this setup still works
 * const MyCustomComponent = () => {
 *  const [activeThread, setActiveThread] = useState();
 *
 *  return <>
 *    // simplified
 *    <ThreadList onItemPointerDown={setActiveThread} />
 *    <ThreadProvider thread={activeThread}>
 *      <Thread />
 *    </ThreadProvider>
 *  </>
 * }
 *
 */
const ThreadAdapter = ({ children }) => {
    const { activeThread } = useThreadsViewContext();
    useActiveThread({ activeThread });
    return React.createElement(ThreadProvider, { thread: activeThread }, children);
};
const selector = ({ unreadThreadCount }) => ({
    unreadThreadCount,
});
const ChatViewSelector = () => {
    const { client } = useChatContext();
    const { unreadThreadCount } = useStateStore(client.threads.state, selector);
    const { activeChatView, setActiveChatView } = useContext(ChatViewContext);
    return (React.createElement("div", { className: 'str-chat__chat-view__selector' },
        React.createElement("button", { "aria-selected": activeChatView === 'channels', className: 'str-chat__chat-view__selector-button', onPointerDown: () => setActiveChatView('channels'), role: 'tab' },
            React.createElement(Icon.MessageBubbleEmpty, null),
            React.createElement("div", { className: 'str-chat__chat-view__selector-button-text' }, "Channels")),
        React.createElement("button", { "aria-selected": activeChatView === 'threads', className: 'str-chat__chat-view__selector-button', onPointerDown: () => setActiveChatView('threads'), role: 'tab' },
            React.createElement(UnreadCountBadge, { count: unreadThreadCount, position: 'top-right' },
                React.createElement(Icon.MessageBubble, null)),
            React.createElement("div", { className: 'str-chat__chat-view__selector-button-text' }, "Threads"))));
};
ChatView.Channels = ChannelsView;
ChatView.Threads = ThreadsView;
ChatView.ThreadAdapter = ThreadAdapter;
ChatView.Selector = ChatViewSelector;
