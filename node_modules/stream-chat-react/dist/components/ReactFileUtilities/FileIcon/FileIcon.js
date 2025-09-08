import React from 'react';
import { iconMap } from './iconMap';
export function mimeTypeToIcon(type = 'standard', mimeType) {
    const theMap = iconMap[type] || iconMap['standard'];
    if (!mimeType)
        return theMap.fallback;
    const icon = theMap[mimeType];
    if (icon)
        return icon;
    if (mimeType.startsWith('audio/'))
        return theMap['audio/'];
    if (mimeType.startsWith('video/'))
        return theMap['video/'];
    if (mimeType.startsWith('image/'))
        return theMap['image/'];
    if (mimeType.startsWith('text/'))
        return theMap['text/'];
    return theMap.fallback;
}
export const FileIcon = (props) => {
    const { big = false, mimeType, size = 50, sizeSmall = 20, type = 'standard', ...rest } = props;
    const Icon = mimeTypeToIcon(type, mimeType);
    return React.createElement(Icon, { ...rest, size: big ? size : sizeSmall });
};
