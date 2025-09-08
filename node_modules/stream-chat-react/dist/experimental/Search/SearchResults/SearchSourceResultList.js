import React from 'react';
import { DefaultSearchResultItems } from './SearchResultItem';
import { SearchSourceResultListFooter as DefaultSearchSourceResultListFooter } from './SearchSourceResultListFooter';
import { useSearchSourceResultsContext } from '../SearchSourceResultsContext';
import { InfiniteScrollPaginator } from '../../../components/InfiniteScrollPaginator/InfiniteScrollPaginator';
import { useComponentContext } from '../../../context';
import { useStateStore } from '../../../store';
const searchSourceStateSelector = (nextValue) => ({
    items: nextValue.items,
});
export const SearchSourceResultList = ({ loadMoreDebounceMs = 100, loadMoreThresholdPx = 80, SearchResultItems = DefaultSearchResultItems, }) => {
    const { SearchSourceResultListFooter = DefaultSearchSourceResultListFooter } = useComponentContext();
    const { searchSource } = useSearchSourceResultsContext();
    const { items } = useStateStore(searchSource.state, searchSourceStateSelector);
    const SearchResultItem = SearchResultItems[searchSource.type];
    if (!SearchResultItem)
        return null;
    return (React.createElement("div", { className: 'str-chat__search-source-result-list', "data-testid": 'search-source-result-list' },
        React.createElement(InfiniteScrollPaginator, { loadNextDebounceMs: loadMoreDebounceMs, loadNextOnScrollToBottom: searchSource.search, threshold: loadMoreThresholdPx },
            items?.map((item, i) => (React.createElement(SearchResultItem, { item: item, key: `source-search-result-${searchSource.type}-${i}` }))),
            React.createElement(SearchSourceResultListFooter, null))));
};
