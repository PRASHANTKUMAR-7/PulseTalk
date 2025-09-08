import React from 'react';
export const CustomMessageActionsList = (props) => {
    const { customMessageActions, message } = props;
    if (!customMessageActions)
        return null;
    const customActionsArray = Object.keys(customMessageActions);
    return (React.createElement(React.Fragment, null, customActionsArray.map((customAction) => {
        const customHandler = customMessageActions[customAction];
        return (React.createElement("button", { "aria-selected": 'false', className: 'str-chat__message-actions-list-item str-chat__message-actions-list-item-button', key: customAction, onClick: (event) => customHandler(message, event), role: 'option' }, customAction));
    })));
};
