import React from 'react';
import { SearchSourceResults as DefaultSourceSearchResults } from './SearchSourceResults';
import { SearchResultsHeader as DefaultSearchResultsHeader } from './SearchResultsHeader';
import { SearchResultsPresearch as DefaultSearchResultsPresearch } from './SearchResultsPresearch';
import { useSearchContext } from '../SearchContext';
import { useComponentContext, useTranslationContext } from '../../../context';
import { useStateStore } from '../../../store';
const searchControllerStateSelector = (nextValue) => ({
    activeSources: nextValue.sources.filter((s) => s.isActive),
    isActive: nextValue.isActive,
    searchQuery: nextValue.searchQuery,
});
export const SearchResults = () => {
    const { t } = useTranslationContext('ResultsContainer');
    const { SearchResultsHeader = DefaultSearchResultsHeader, SearchResultsPresearch = DefaultSearchResultsPresearch, SearchSourceResults = DefaultSourceSearchResults, } = useComponentContext();
    const { searchController } = useSearchContext();
    const { activeSources, isActive, searchQuery } = useStateStore(searchController.state, searchControllerStateSelector);
    return !isActive ? null : (React.createElement("div", { "aria-label": t('aria/Search results'), className: 'str-chat__search-results' },
        React.createElement(SearchResultsHeader, null),
        !searchQuery ? (React.createElement(SearchResultsPresearch, { activeSources: activeSources })) : (activeSources.map((source) => (React.createElement(SearchSourceResults, { key: source.type, searchSource: source }))))));
};
