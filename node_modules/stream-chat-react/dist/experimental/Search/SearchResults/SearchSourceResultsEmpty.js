import React from 'react';
import { useTranslationContext } from '../../../context';
export const SearchSourceResultsEmpty = () => {
    const { t } = useTranslationContext();
    return (React.createElement("div", { className: 'str-chat__search-source-results-empty' }, t('No results found')));
};
