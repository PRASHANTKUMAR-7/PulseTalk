import React, { createContext, useContext } from 'react';
export const SearchContext = createContext(undefined);
/**
 * Context provider for components rendered within the `Search` component
 */
export const SearchContextProvider = ({ children, value, }) => (React.createElement(SearchContext.Provider, { value: value }, children));
export const useSearchContext = () => {
    const contextValue = useContext(SearchContext);
    return contextValue;
};
