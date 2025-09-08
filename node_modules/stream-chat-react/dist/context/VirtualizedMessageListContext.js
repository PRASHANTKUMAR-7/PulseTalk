import React, { createContext, useContext } from 'react';
export const VirtualizedMessageListContext = createContext(undefined);
/**
 * Context provider for components rendered within the `VirtualizedMessageList`
 */
export const VirtualizedMessageListContextProvider = ({ children, value, }) => (React.createElement(VirtualizedMessageListContext.Provider, { value: value }, children));
export const useVirtualizedMessageListContext = () => useContext(VirtualizedMessageListContext);
