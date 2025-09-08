import React from 'react';
export type SpriteImageProps = {
    columns: number;
    position: [number, number];
    rows: number;
    spriteUrl: string;
    fallback?: React.ReactNode;
    height?: number;
    style?: React.CSSProperties;
    width?: number;
};
export declare const SpriteImage: ({ columns, fallback, height, position, rows, spriteUrl, style, width, }: SpriteImageProps) => React.JSX.Element;
