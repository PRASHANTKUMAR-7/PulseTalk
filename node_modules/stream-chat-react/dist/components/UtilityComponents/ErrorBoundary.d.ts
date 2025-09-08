import { Component } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
type ErrorBoundaryProps = PropsWithChildren<{
    fallback?: ReactNode;
}>;
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, {
    hasError: boolean;
}> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: unknown, information: unknown): void;
    render(): ReactNode;
}
export {};
