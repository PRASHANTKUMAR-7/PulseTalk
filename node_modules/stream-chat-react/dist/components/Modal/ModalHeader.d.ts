import React from 'react';
export type ModalHeaderProps = {
    title: string;
    className?: string;
    close?: () => void;
    goBack?: () => void;
};
export declare const ModalHeader: ({ className, close, goBack, title }: ModalHeaderProps) => React.JSX.Element;
