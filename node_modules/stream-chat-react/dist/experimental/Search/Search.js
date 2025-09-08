import clsx from 'clsx';
import React from 'react';
import { SearchBar as DefaultSearchBar } from './SearchBar/SearchBar';
import { SearchResults as DefaultSearchResults } from './SearchResults/SearchResults';
import { SearchContextProvider } from './SearchContext';
import { useChatContext, useComponentContext } from '../../context';
import { useStateStore } from '../../store';
const searchControllerStateSelector = (nextValue) => ({ isActive: nextValue.isActive });
export const Search = ({ directMessagingChannelType = 'messaging', disabled, exitSearchOnInputBlur, placeholder, }) => {
    const { SearchBar = DefaultSearchBar, SearchResults = DefaultSearchResults } = useComponentContext();
    const { searchController } = useChatContext();
    const { isActive } = useStateStore(searchController.state, searchControllerStateSelector);
    return (React.createElement(SearchContextProvider, { value: {
            directMessagingChannelType,
            disabled,
            exitSearchOnInputBlur,
            placeholder,
            searchController,
        } },
        React.createElement("div", { className: clsx('str-chat__search', {
                'str-chat__search--active': isActive,
            }), "data-testid": 'search' },
            React.createElement(SearchBar, null),
            React.createElement(SearchResults, null))));
};
