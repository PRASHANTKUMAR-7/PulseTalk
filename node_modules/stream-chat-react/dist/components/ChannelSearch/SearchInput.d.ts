import React from 'react';
export type SearchInputController = {
    /** Clears the channel search state */
    clearState: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    /** Search input change handler */
    onSearch: React.ChangeEventHandler<HTMLInputElement>;
    /** Current search string */
    query: string;
};
export type AdditionalSearchInputProps = {
    /** Sets the input element into disabled state */
    disabled?: boolean;
    /** Custom placeholder text to be displayed in the search input */
    placeholder?: string;
};
export type SearchInputProps = AdditionalSearchInputProps & SearchInputController;
export declare const SearchInput: (props: SearchInputProps) => React.JSX.Element;
