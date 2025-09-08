import React from 'react';
import clsx from 'clsx';
export const PromptDialog = ({ actions, className, prompt, title, }) => (React.createElement("div", { className: clsx('str-chat__dialog str-chat__dialog--prompt', className) },
    React.createElement("div", { className: 'str-chat__dialog__body' },
        title && React.createElement("div", { className: 'str-chat__dialog__title' }, title),
        React.createElement("div", { className: 'str-chat__dialog__prompt' }, prompt)),
    React.createElement("div", { className: 'str-chat__dialog__controls' }, actions.map(({ className, ...props }, i) => (React.createElement("button", { className: clsx(`str-chat__dialog__controls-button`, className), key: `prompt-dialog__controls-button--${i}`, ...props }))))));
