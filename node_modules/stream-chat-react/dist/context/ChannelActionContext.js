import React, { useContext } from 'react';
export const ChannelActionContext = React.createContext(undefined);
export const ChannelActionProvider = ({ children, value, }) => (React.createElement(ChannelActionContext.Provider, { value: value }, children));
export const useChannelActionContext = (componentName) => {
    const contextValue = useContext(ChannelActionContext);
    if (!contextValue) {
        console.warn(`The useChannelActionContext hook was called outside of the ChannelActionContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if ChannelActionContext
 * typing is desired while using the HOC withChannelActionContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withChannelActionContext = (Component) => {
    const WithChannelActionContextComponent = (props) => {
        const channelActionContext = useChannelActionContext();
        return React.createElement(Component, { ...props, ...channelActionContext });
    };
    WithChannelActionContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithChannelActionContextComponent;
};
