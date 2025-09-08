import React from 'react';
import type { TimestampFormatterOptions } from '../../i18n/types';
export type DateSeparatorProps = TimestampFormatterOptions & {
    /** The date to format */
    date: Date;
    /** Override the default formatting of the date. This is a function that has access to the original date object. */
    formatDate?: (date: Date) => string;
    /** Set the position of the date in the separator, options are 'left', 'center', 'right', @default right */
    position?: 'left' | 'center' | 'right';
    /** If following messages are not new */
    unread?: boolean;
};
/**
 * A simple date separator between messages.
 */
export declare const DateSeparator: (props: DateSeparatorProps) => React.JSX.Element;
