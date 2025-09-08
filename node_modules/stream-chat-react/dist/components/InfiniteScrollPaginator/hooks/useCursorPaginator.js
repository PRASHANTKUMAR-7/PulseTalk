import uniqBy from 'lodash.uniqby';
import { useCallback, useEffect, useMemo } from 'react';
import { StateStore } from 'stream-chat';
export const useCursorPaginator = (paginationFn, loadFirstPage) => {
    const cursorPaginatorState = useMemo(() => new StateStore({
        hasNextPage: true,
        items: [],
        latestPageItems: [],
        loading: false,
    }), []);
    const loadMore = useCallback(async () => {
        const { loading, next: currentNext } = cursorPaginatorState.getLatestValue();
        if (currentNext === null || loading)
            return;
        cursorPaginatorState.partialNext({ loading: true });
        try {
            const { items, next } = await paginationFn(currentNext);
            cursorPaginatorState.next((prev) => ({
                ...prev,
                hasNextPage: !!next,
                items: uniqBy(prev.items.concat(items), 'id'),
                latestPageItems: items,
                next: next || null,
            }));
        }
        catch (error) {
            cursorPaginatorState.partialNext({ error: error });
        }
        cursorPaginatorState.partialNext({ loading: false });
    }, [cursorPaginatorState, paginationFn]);
    useEffect(() => {
        const { items } = cursorPaginatorState.getLatestValue();
        if (!loadFirstPage || items.length)
            return;
        loadMore();
    }, [cursorPaginatorState, loadFirstPage, loadMore]);
    return {
        cursorPaginatorState,
        loadMore,
    };
};
