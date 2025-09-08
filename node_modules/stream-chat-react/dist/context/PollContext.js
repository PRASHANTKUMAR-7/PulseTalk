import React, { useContext } from 'react';
export const PollContext = React.createContext(undefined);
export const PollProvider = ({ children, poll, }) => poll ? (React.createElement(PollContext.Provider, { value: { poll } }, children)) : null;
export const usePollContext = () => {
    const contextValue = useContext(PollContext);
    return contextValue;
};
