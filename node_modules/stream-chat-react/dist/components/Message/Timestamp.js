import React, { useMemo } from 'react';
import { useMessageContext } from '../../context/MessageContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { getDateString, isDate } from '../../i18n/utils';
export function Timestamp(props) {
    const { calendar, calendarFormats, customClass, format, timestamp } = props;
    const { formatDate } = useMessageContext('MessageTimestamp');
    const { t, tDateTimeParser } = useTranslationContext('MessageTimestamp');
    const normalizedTimestamp = timestamp && isDate(timestamp) ? timestamp.toISOString() : timestamp;
    const when = useMemo(() => getDateString({
        calendar,
        calendarFormats,
        format,
        formatDate,
        messageCreatedAt: normalizedTimestamp,
        t,
        tDateTimeParser,
        timestampTranslationKey: 'timestamp/MessageTimestamp',
    }), [
        calendar,
        calendarFormats,
        format,
        formatDate,
        normalizedTimestamp,
        t,
        tDateTimeParser,
    ]);
    if (!when) {
        return null;
    }
    return (React.createElement("time", { className: customClass, dateTime: normalizedTimestamp, title: normalizedTimestamp }, when));
}
