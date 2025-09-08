import { findAndReplace } from 'hast-util-find-and-replace';
import { u } from 'unist-builder';
import emojiRegex from 'emoji-regex';
export const emojiMarkdownPlugin = () => {
    const replace = (match) => u('element', { properties: {}, tagName: 'emoji' }, [u('text', match)]);
    const transform = (node) => findAndReplace(node, [emojiRegex(), replace]);
    return transform;
};
