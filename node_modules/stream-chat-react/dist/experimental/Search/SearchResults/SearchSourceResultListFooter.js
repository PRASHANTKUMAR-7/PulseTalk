import React from 'react';
import { SearchSourceResultsLoadingIndicator as DefaultSearchSourceResultsLoadingIndicator } from './SearchSourceResultsLoadingIndicator';
import { useSearchSourceResultsContext } from '../SearchSourceResultsContext';
import { useComponentContext, useTranslationContext } from '../../../context';
import { useStateStore } from '../../../store';
const searchSourceStateSelector = (value) => ({
    hasNext: value.hasNext,
    isLoading: value.isLoading,
});
export const SearchSourceResultListFooter = () => {
    const { t } = useTranslationContext();
    const { SearchSourceResultsLoadingIndicator = DefaultSearchSourceResultsLoadingIndicator, } = useComponentContext();
    const { searchSource } = useSearchSourceResultsContext();
    const { hasNext, isLoading } = useStateStore(searchSource.state, searchSourceStateSelector);
    return (React.createElement("div", { className: 'str-chat__search-source-result-list__footer', "data-testid": 'search-footer' }, isLoading ? (React.createElement(SearchSourceResultsLoadingIndicator, null)) : !hasNext ? (React.createElement("div", { className: 'str-chat__search-source-results---empty' }, t('All results loaded'))) : null));
};
