import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import { getDateString } from '../../i18n/utils';
const UnMemoizedDateSeparator = (props) => {
    const { calendar, date: messageCreatedAt, formatDate, position = 'right', unread, ...restTimestampFormatterOptions } = props;
    const { t, tDateTimeParser } = useTranslationContext('DateSeparator');
    const formattedDate = getDateString({
        calendar,
        ...restTimestampFormatterOptions,
        formatDate,
        messageCreatedAt,
        t,
        tDateTimeParser,
        timestampTranslationKey: 'timestamp/DateSeparator',
    });
    return (React.createElement("div", { className: 'str-chat__date-separator', "data-testid": 'date-separator' },
        (position === 'right' || position === 'center') && (React.createElement("hr", { className: 'str-chat__date-separator-line' })),
        React.createElement("div", { className: 'str-chat__date-separator-date' }, unread ? `${t('New')} - ${formattedDate}` : formattedDate),
        (position === 'left' || position === 'center') && (React.createElement("hr", { className: 'str-chat__date-separator-line' }))));
};
/**
 * A simple date separator between messages.
 */
export const DateSeparator = React.memo(UnMemoizedDateSeparator);
