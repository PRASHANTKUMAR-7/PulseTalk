import React, { useEffect } from 'react';
import { LoadingIndicator } from '../Loading';
import { deprecationAndReplacementWarning } from '../../utils/deprecationWarning';
import { useTranslationContext } from '../../context';
const UnMemoizedLoadMoreButton = ({ children, isLoading, onClick, refreshing, }) => {
    const { t } = useTranslationContext('UnMemoizedLoadMoreButton');
    const childrenOrDefaultString = children ?? t('Load more');
    const loading = typeof isLoading !== 'undefined' ? isLoading : refreshing;
    useEffect(() => {
        deprecationAndReplacementWarning([[{ refreshing }, { isLoading }]], 'LoadMoreButton');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement("div", { className: 'str-chat__load-more-button' },
        React.createElement("button", { "aria-label": t('aria/Load More Channels'), className: 'str-chat__load-more-button__button str-chat__cta-button', "data-testid": 'load-more-button', disabled: loading, onClick: onClick }, loading ? React.createElement(LoadingIndicator, null) : childrenOrDefaultString)));
};
export const LoadMoreButton = React.memo(UnMemoizedLoadMoreButton);
