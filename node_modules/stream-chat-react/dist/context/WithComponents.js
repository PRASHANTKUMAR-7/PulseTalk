import React, { useContext } from 'react';
import { ComponentContext } from './ComponentContext';
export function WithComponents({ children, overrides, }) {
    const parentOverrides = useContext(ComponentContext);
    const actualOverrides = { ...parentOverrides, ...overrides };
    return (React.createElement(ComponentContext.Provider, { value: actualOverrides }, children));
}
