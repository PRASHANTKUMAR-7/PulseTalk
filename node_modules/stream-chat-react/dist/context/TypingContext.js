import React, { useContext } from 'react';
export const TypingContext = React.createContext(undefined);
export const TypingProvider = ({ children, value, }) => (React.createElement(TypingContext.Provider, { value: value }, children));
export const useTypingContext = (componentName) => {
    const contextValue = useContext(TypingContext);
    if (!contextValue) {
        console.warn(`The useTypingContext hook was called outside of the TypingContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if TypingContext
 * typing is desired while using the HOC withTypingContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withTypingContext = (Component) => {
    const WithTypingContextComponent = (props) => {
        const typingContext = useTypingContext();
        return React.createElement(Component, { ...props, ...typingContext });
    };
    WithTypingContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithTypingContextComponent;
};
