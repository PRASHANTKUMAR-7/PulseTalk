import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
export const SearchInput = (props) => {
    const { disabled, inputRef, onSearch, placeholder, query } = props;
    const { t } = useTranslationContext('SearchInput');
    return (React.createElement("input", { className: 'str-chat__channel-search-input', "data-testid": 'search-input', disabled: disabled, onChange: onSearch, placeholder: placeholder ?? t('Search'), ref: inputRef, type: 'text', value: query }));
};
