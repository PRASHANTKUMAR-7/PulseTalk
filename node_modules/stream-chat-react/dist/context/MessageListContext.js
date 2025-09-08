import React, { createContext, useContext } from 'react';
export const MessageListContext = createContext(undefined);
/**
 * Context provider for components rendered within the `MessageList`
 */
export const MessageListContextProvider = ({ children, value, }) => (React.createElement(MessageListContext.Provider, { value: value }, children));
export const useMessageListContext = (componentName) => {
    const contextValue = useContext(MessageListContext);
    if (!contextValue) {
        console.warn(`The useMessageListContext hook was called outside of the MessageListContext provider. Make sure this hook is called within the MessageList component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
