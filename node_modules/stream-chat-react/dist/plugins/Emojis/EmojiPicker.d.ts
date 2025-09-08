import React from 'react';
import type { Options } from '@popperjs/core';
export type EmojiPickerProps = {
    ButtonIconComponent?: React.ComponentType;
    buttonClassName?: string;
    pickerContainerClassName?: string;
    wrapperClassName?: string;
    closeOnEmojiSelect?: boolean;
    /**
     * Untyped [properties](https://github.com/missive/emoji-mart/tree/v5.5.2#options--props) to be
     * passed down to the [emoji-mart `Picker`](https://github.com/missive/emoji-mart/tree/v5.5.2#-picker) component
     */
    pickerProps?: Partial<{
        theme: 'auto' | 'light' | 'dark';
    } & Record<string, unknown>>;
    /**
     * [React Popper options](https://popper.js.org/docs/v2/constructors/#options) to be
     * passed down to the [react-popper `usePopper`](https://popper.js.org/react-popper/v2/hook/) hook
     */
    popperOptions?: Partial<Options>;
};
export declare const EmojiPicker: (props: EmojiPickerProps) => React.JSX.Element;
