/* eslint-disable sort-keys */
import React from 'react';
import { StreamEmoji } from './StreamEmoji';
export const defaultReactionOptions = [
    {
        type: 'haha',
        Component: () => React.createElement(StreamEmoji, { fallback: '\uD83D\uDE02', type: 'haha' }),
        name: 'Joy',
    },
    {
        type: 'like',
        Component: () => React.createElement(StreamEmoji, { fallback: '\uD83D\uDC4D', type: 'like' }),
        name: 'Thumbs up',
    },
    {
        type: 'love',
        Component: () => React.createElement(StreamEmoji, { fallback: '\u2764\uFE0F', type: 'love' }),
        name: 'Heart',
    },
    { type: 'sad', Component: () => React.createElement(StreamEmoji, { fallback: '\uD83D\uDE14', type: 'sad' }), name: 'Sad' },
    {
        type: 'wow',
        Component: () => React.createElement(StreamEmoji, { fallback: '\uD83D\uDE32', type: 'wow' }),
        name: 'Astonished',
    },
];
