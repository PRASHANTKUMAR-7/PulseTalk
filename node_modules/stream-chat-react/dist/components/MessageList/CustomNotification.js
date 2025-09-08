import React from 'react';
import clsx from 'clsx';
const UnMemoizedCustomNotification = (props) => {
    const { active, children, className, type } = props;
    if (!active)
        return null;
    return (React.createElement("div", { "aria-live": 'polite', className: clsx(`str-chat__custom-notification notification-${type}`, `str-chat__notification`, `str-chat-react__notification`, className), "data-testid": 'custom-notification' }, children));
};
export const CustomNotification = React.memo(UnMemoizedCustomNotification);
