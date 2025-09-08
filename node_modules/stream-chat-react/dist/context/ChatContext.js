import React, { useContext } from 'react';
import { getDisplayName } from './utils/getDisplayName';
export const ChatContext = React.createContext(undefined);
export const ChatProvider = ({ children, value, }) => (React.createElement(ChatContext.Provider, { value: value }, children));
export const useChatContext = (componentName) => {
    const contextValue = useContext(ChatContext);
    if (!contextValue) {
        console.warn(`The useChatContext hook was called outside of the ChatContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference so if ChatContext
 * typing is desired while using the HOC withChatContext the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withChatContext = (Component) => {
    const WithChatContextComponent = (props) => {
        const chatContext = useChatContext();
        return React.createElement(Component, { ...props, ...chatContext });
    };
    WithChatContextComponent.displayName = `WithChatContext${getDisplayName(Component)}`;
    return WithChatContextComponent;
};
