import React, { useContext } from 'react';
export const ComponentContext = React.createContext({});
export const ComponentProvider = ({ children, value, }) => (React.createElement(ComponentContext.Provider, { value: value }, children));
export const useComponentContext = (
/**
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_componentName) => useContext(ComponentContext);
/**
 * Typescript currently does not support partial inference, so if ComponentContext
 * typing is desired while using the HOC withComponentContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withComponentContext = (Component) => {
    const WithComponentContextComponent = (props) => {
        const componentContext = useComponentContext();
        return React.createElement(Component, { ...props, ...componentContext });
    };
    WithComponentContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithComponentContextComponent;
};
