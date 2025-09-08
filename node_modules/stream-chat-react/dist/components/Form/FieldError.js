import clsx from 'clsx';
import React from 'react';
export const FieldError = ({ className, text, ...props }) => (React.createElement("div", { ...props, className: clsx('str-chat__form-field-error', className) }, text));
