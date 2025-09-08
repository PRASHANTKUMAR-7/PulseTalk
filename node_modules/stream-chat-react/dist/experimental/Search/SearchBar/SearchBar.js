import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSearchContext } from '../SearchContext';
import { useSearchQueriesInProgress } from '../hooks';
import { useTranslationContext } from '../../../context';
import { useStateStore } from '../../../store';
const searchControllerStateSelector = (nextValue) => ({
    isActive: nextValue.isActive,
    searchQuery: nextValue.searchQuery,
});
export const SearchBar = () => {
    const { t } = useTranslationContext();
    const { disabled, exitSearchOnInputBlur, placeholder, searchController } = useSearchContext();
    const queriesInProgress = useSearchQueriesInProgress(searchController);
    const [input, setInput] = useState(null);
    const { isActive, searchQuery } = useStateStore(searchController.state, searchControllerStateSelector);
    useEffect(() => {
        if (!input)
            return;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                input.blur();
                searchController.exit();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchController, input]);
    return (React.createElement("div", { className: 'str-chat__search-bar', "data-testid": 'search-bar' },
        React.createElement("div", { className: clsx('str-chat__search-input--wrapper', {
                'str-chat__search-input--wrapper-active': isActive,
            }) },
            React.createElement("div", { className: 'str-chat__search-input--icon' }),
            React.createElement("input", { className: 'str-chat__search-input', "data-testid": 'search-input', disabled: disabled, onBlur: () => {
                    if (exitSearchOnInputBlur)
                        searchController.exit();
                }, onChange: (event) => {
                    if (event.target.value) {
                        searchController.search(event.target.value);
                    }
                    else if (!event.target.value) {
                        searchController.clear();
                    }
                }, onFocus: searchController.activate, placeholder: placeholder ?? t('Search'), ref: setInput, type: 'text', value: searchQuery }),
            searchQuery && (React.createElement("button", { className: 'str-chat__search-input--clear-button', "data-testid": 'clear-input-button', disabled: queriesInProgress.length > 0, onClick: () => {
                    searchController.clear();
                    input?.focus();
                } },
                React.createElement("div", { className: 'str-chat__search-input--clear-button-icon' })))),
        isActive ? (React.createElement("button", { className: clsx('str-chat__search-bar-button str-chat__search-bar-button--exit-search'), "data-testid": 'search-bar-button', onClick: () => {
                input?.blur();
                searchController.exit();
            } }, t('Cancel'))) : null));
};
