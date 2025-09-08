import { useMemo } from 'react';
export const useCreateTypingContext = (value) => {
    const { typing } = value;
    const typingValue = Object.keys(typing || {}).join();
    const typingContext = useMemo(() => ({
        typing,
    }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [typingValue]);
    return typingContext;
};
