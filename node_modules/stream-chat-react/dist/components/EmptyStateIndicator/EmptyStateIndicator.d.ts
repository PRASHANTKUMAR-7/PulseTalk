import React from 'react';
export type EmptyStateIndicatorProps = {
    /** List Type: channel | message */
    listType?: 'channel' | 'message' | 'thread';
};
export declare const EmptyStateIndicator: (props: EmptyStateIndicatorProps) => React.JSX.Element | null;
