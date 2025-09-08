import clsx from 'clsx';
import React from 'react';
export const Anchor = ({ children, href }) => {
    const isEmail = href?.startsWith('mailto:');
    const isUrl = href?.startsWith('http');
    if (!href || (!isEmail && !isUrl))
        return React.createElement(React.Fragment, null, children);
    return (React.createElement("a", { className: clsx({ 'str-chat__message-url-link': isUrl }), href: href, rel: 'nofollow noreferrer noopener', target: '_blank' }, children));
};
