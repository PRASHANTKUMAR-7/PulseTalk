import React, { createContext, useContext } from 'react';
export const SearchSourceResultsContext = createContext(undefined);
/**
 * Context provider for components rendered within the `SearchSourceResults`
 */
export const SearchSourceResultsContextProvider = ({ children, value, }) => (React.createElement(SearchSourceResultsContext.Provider, { value: value }, children));
export const useSearchSourceResultsContext = () => {
    const contextValue = useContext(SearchSourceResultsContext);
    return contextValue;
};
