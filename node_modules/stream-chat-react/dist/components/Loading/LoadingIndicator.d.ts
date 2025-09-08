import React from 'react';
export type LoadingIndicatorProps = {
    /** Set the color of the LoadingIndicator */
    color?: string;
    /** The size of the loading icon, @default 15px */
    size?: number;
};
/**
 * Simple loading spinner
 */
export declare const LoadingIndicator: (props: LoadingIndicatorProps) => React.JSX.Element;
