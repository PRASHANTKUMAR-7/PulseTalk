import React from 'react';
import { Message } from '../Message/Message';
export const GiphyPreviewMessage = (props) => {
    const { message } = props;
    return (React.createElement("div", { className: 'giphy-preview-message' },
        React.createElement(Message, { message: message })));
};
