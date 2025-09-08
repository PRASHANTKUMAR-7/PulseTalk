import { useEffect, useRef, useState } from 'react';
const DEFAULT_LETTER_INTERVAL = 30;
const DEFAULT_RENDERING_LETTER_COUNT = 2;
/**
 * A hook that returns text in a streamed, typewriter fashion. The speed of streaming is
 * configurable.
 * @param {number} [streamingLetterIntervalMs=30] - The timeout between each typing animation in milliseconds.
 * @param {number} [renderingLetterCount=2] - The number of letters to be rendered each time we update.
 * @param {string} text - The text that we want to render in a typewriter fashion.
 * @returns {{ streamedMessageText: string }} - A substring of the text property, up until we've finished rendering the typewriter animation.
 */
export const useMessageTextStreaming = ({ renderingLetterCount = DEFAULT_RENDERING_LETTER_COUNT, streamingLetterIntervalMs = DEFAULT_LETTER_INTERVAL, text, }) => {
    const [streamedMessageText, setStreamedMessageText] = useState(text);
    const textCursor = useRef(text.length);
    useEffect(() => {
        const textLength = text.length;
        const interval = setInterval(() => {
            if (!text || textCursor.current >= textLength) {
                clearInterval(interval);
            }
            const newCursorValue = textCursor.current + renderingLetterCount;
            const newText = text.substring(0, newCursorValue);
            textCursor.current += newText.length - textCursor.current;
            setStreamedMessageText(newText);
        }, streamingLetterIntervalMs);
        return () => {
            clearInterval(interval);
        };
    }, [streamingLetterIntervalMs, renderingLetterCount, text]);
    return { streamedMessageText };
};
