import clsx from 'clsx';
import React from 'react';
import { Avatar } from './Avatar';
export const GroupAvatar = ({ className, groupChannelDisplayInfo, onClick, onMouseOver, }) => (React.createElement("div", { className: clsx(`str-chat__avatar-group`, { 'str-chat__avatar-group--three-part': groupChannelDisplayInfo.length === 3 }, className), "data-testid": 'group-avatar', onClick: onClick, onMouseOver: onMouseOver, role: 'button' }, groupChannelDisplayInfo.slice(0, 4).map(({ image, name }, i) => (React.createElement(Avatar, { className: clsx({
        'str-chat__avatar--single': groupChannelDisplayInfo.length === 3 && i === 0,
    }), image: image, key: `${name}-${image}-${i}`, name: name })))));
