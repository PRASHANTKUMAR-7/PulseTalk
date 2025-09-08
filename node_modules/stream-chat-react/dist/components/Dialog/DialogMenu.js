import React from 'react';
import clsx from 'clsx';
export const DialogMenuButton = ({ children, className, ...props }) => (React.createElement("button", { className: clsx('str-chat__dialog-menu__button', className), ...props },
    React.createElement("div", { className: 'str-chat__dialog-menu__button-icon' }),
    React.createElement("div", { className: 'str-chat__dialog-menu__button-text' }, children)));
