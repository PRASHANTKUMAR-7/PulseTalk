import React from 'react';
const UnMemoizedMessageNotification = (props) => {
    const { children, onClick, showNotification = true } = props;
    if (!showNotification)
        return null;
    return (React.createElement("button", { "aria-live": 'polite', className: `str-chat__message-notification`, "data-testid": 'message-notification', onClick: onClick }, children));
};
export const MessageNotification = React.memo(UnMemoizedMessageNotification);
