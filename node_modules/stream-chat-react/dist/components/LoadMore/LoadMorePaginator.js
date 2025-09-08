import React, { useEffect } from 'react';
import { LoadMoreButton as DefaultLoadMoreButton } from './LoadMoreButton';
import { deprecationAndReplacementWarning } from '../../utils/deprecationWarning';
export const UnMemoizedLoadMorePaginator = (props) => {
    const { children, hasNextPage, isLoading, LoadMoreButton = DefaultLoadMoreButton, loadNextPage, refreshing, reverse, } = props;
    const loadingState = typeof isLoading !== 'undefined' ? isLoading : refreshing;
    useEffect(() => {
        deprecationAndReplacementWarning([[{ refreshing }, { isLoading }]], 'LoadMorePaginator');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement(React.Fragment, null,
        !reverse && children,
        hasNextPage && React.createElement(LoadMoreButton, { isLoading: loadingState, onClick: loadNextPage }),
        reverse && children));
};
export const LoadMorePaginator = React.memo(UnMemoizedLoadMorePaginator);
