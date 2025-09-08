import React from 'react';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useTranslationContext } from '../../context/TranslationContext';
import { getDateString } from '../../i18n/utils';
/**
 * Component to display system and channel event messages
 */
const UnMemoizedEventComponent = (props) => {
    const { Avatar = DefaultAvatar, calendar, calendarFormats, format, message } = props;
    const { t, tDateTimeParser } = useTranslationContext('EventComponent');
    const { created_at = '', event, text, type } = message;
    const getDateOptions = { messageCreatedAt: created_at.toString(), tDateTimeParser };
    if (type === 'system')
        return (React.createElement("div", { className: 'str-chat__message--system', "data-testid": 'message-system' },
            React.createElement("div", { className: 'str-chat__message--system__text' },
                React.createElement("div", { className: 'str-chat__message--system__line' }),
                React.createElement("p", null, text),
                React.createElement("div", { className: 'str-chat__message--system__line' })),
            React.createElement("div", { className: 'str-chat__message--system__date' },
                React.createElement("strong", null, getDateString({
                    ...getDateOptions,
                    calendar,
                    calendarFormats,
                    format,
                    t,
                    timestampTranslationKey: 'timestamp/SystemMessage',
                })))));
    if (event?.type === 'member.removed' || event?.type === 'member.added') {
        const name = event.user?.name || event.user?.id;
        const sentence = `${name} ${event.type === 'member.added' ? 'has joined the chat' : 'was removed from the chat'}`;
        return (React.createElement("div", { className: 'str-chat__event-component__channel-event' },
            React.createElement(Avatar, { image: event.user?.image, name: name, user: event.user }),
            React.createElement("div", { className: 'str-chat__event-component__channel-event__content' },
                React.createElement("em", { className: 'str-chat__event-component__channel-event__sentence' }, sentence),
                React.createElement("div", { className: 'str-chat__event-component__channel-event__date' }, getDateString({ ...getDateOptions, format: 'LT' })))));
    }
    return null;
};
export const EventComponent = React.memo(UnMemoizedEventComponent);
