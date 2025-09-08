import { StateStore } from 'stream-chat';
export type CursorPaginatorState<T> = {
    hasNextPage: boolean;
    items: T[];
    latestPageItems: T[];
    loading: boolean;
    error?: Error;
    next?: string | null;
};
export type CursorPaginatorStateStore<T> = StateStore<CursorPaginatorState<T>>;
export type PaginationFn<T> = (next?: string) => Promise<{
    items: T[];
    next?: string;
}>;
export declare const useCursorPaginator: <T>(paginationFn: PaginationFn<T>, loadFirstPage?: boolean) => {
    cursorPaginatorState: StateStore<CursorPaginatorState<T>>;
    loadMore: () => Promise<void>;
};
