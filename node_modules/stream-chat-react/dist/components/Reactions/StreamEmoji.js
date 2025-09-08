import React from 'react';
import { SpriteImage } from './SpriteImage';
const StreamSpriteEmojiPositions = {
    angry: [1, 1],
    haha: [1, 0],
    like: [0, 0],
    love: [1, 2],
    sad: [0, 1],
    wow: [0, 2],
};
const STREAM_SPRITE_URL = 'https://getstream.imgix.net/images/emoji-sprite.png';
export const StreamEmoji = ({ fallback, type, }) => {
    const position = StreamSpriteEmojiPositions[type];
    return (React.createElement(SpriteImage, { columns: 2, fallback: fallback, position: position, rows: 3, spriteUrl: STREAM_SPRITE_URL, style: {
            '--str-chat__sprite-image-height': 'var(--str-chat__stream-emoji-size, 18px)',
        } }));
};
