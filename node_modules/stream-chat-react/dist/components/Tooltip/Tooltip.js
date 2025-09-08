import React, { useState } from 'react';
import { usePopper } from 'react-popper';
export const Tooltip = ({ children, ...rest }) => (React.createElement("div", { className: 'str-chat__tooltip', ...rest }, children));
export const PopperTooltip = ({ children, offset = [0, 10], placement = 'top', referenceElement, visible = false, }) => {
    const [popperElement, setPopperElement] = useState(null);
    const { attributes, styles } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset,
                },
            },
        ],
        placement,
    });
    if (!visible)
        return null;
    return (React.createElement("div", { className: 'str-chat__tooltip', ref: setPopperElement, style: styles.popper, ...attributes.popper }, children));
};
