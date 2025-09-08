import React from 'react';
import type { PropsWithChildren } from 'react';
import type { Thread } from 'stream-chat';
export declare const ChatView: {
    ({ children }: PropsWithChildren): React.JSX.Element;
    Channels: ({ children }: PropsWithChildren) => React.JSX.Element | null;
    Threads: ({ children }: PropsWithChildren) => React.JSX.Element | null;
    ThreadAdapter: ({ children }: PropsWithChildren) => React.JSX.Element;
    Selector: () => React.JSX.Element;
};
export type ThreadsViewContextValue = {
    activeThread: Thread | undefined;
    setActiveThread: (cv: ThreadsViewContextValue['activeThread']) => void;
};
export declare const useThreadsViewContext: () => ThreadsViewContextValue;
export declare const useActiveThread: ({ activeThread }: {
    activeThread?: Thread;
}) => void;
