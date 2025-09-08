import React, { useContext } from 'react';
export const ChannelStateContext = React.createContext(undefined);
export const ChannelStateProvider = ({ children, value, }) => (React.createElement(ChannelStateContext.Provider, { value: value }, children));
export const useChannelStateContext = (componentName) => {
    const contextValue = useContext(ChannelStateContext);
    if (!contextValue) {
        console.warn(`The useChannelStateContext hook was called outside of the ChannelStateContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if ChannelStateContext
 * typing is desired while using the HOC withChannelStateContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withChannelStateContext = (Component) => {
    const WithChannelStateContextComponent = (props) => {
        const channelStateContext = useChannelStateContext();
        return React.createElement(Component, { ...props, ...channelStateContext });
    };
    WithChannelStateContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithChannelStateContextComponent;
};
