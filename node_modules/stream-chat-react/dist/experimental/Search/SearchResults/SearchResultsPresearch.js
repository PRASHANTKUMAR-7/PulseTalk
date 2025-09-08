import React from 'react';
import { useTranslationContext } from '../../../context';
export const SearchResultsPresearch = () => {
    const { t } = useTranslationContext();
    return (React.createElement("div", { className: 'str-chat__search-results-presearch' }, t('Start typing to search')));
};
