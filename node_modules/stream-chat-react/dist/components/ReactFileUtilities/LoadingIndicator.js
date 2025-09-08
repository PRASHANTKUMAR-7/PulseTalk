import React from 'react';
export const LoadingIndicator = ({ backgroundColor, color, size = 20, width = 2, }) => (React.createElement("div", { className: 'rfu-loading-indicator__spinner', style: {
        borderColor: backgroundColor ? backgroundColor : '',
        borderTopColor: color ? color : '',
        borderWidth: width ? width : '',
        height: size ? size : '',
        margin: '0 auto',
        width: size ? size : '',
    } }));
