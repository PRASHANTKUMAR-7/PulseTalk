import React from 'react';
export type ReactionOptions = Array<{
    Component: React.ComponentType;
    type: string;
    name?: string;
}>;
export declare const defaultReactionOptions: ReactionOptions;
