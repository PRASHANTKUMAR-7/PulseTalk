import React from 'react';
import clsx from 'clsx';
export const ModalHeader = ({ className, close, goBack, title }) => (React.createElement("div", { className: clsx('str-chat__modal-header', className) },
    goBack && (React.createElement("button", { className: 'str-chat__modal-header__go-back-button', onClick: goBack })),
    React.createElement("div", { className: 'str-chat__modal-header__title' }, title),
    close && React.createElement("button", { className: 'str-chat__modal-header__close-button', onClick: close })));
