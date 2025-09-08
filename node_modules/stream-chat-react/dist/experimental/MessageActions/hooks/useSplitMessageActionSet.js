import { useMemo } from 'react';
export const useSplitMessageActionSet = (messageActionSet) => useMemo(() => {
    const quickActionSet = [];
    const dropdownActionSet = [];
    for (const action of messageActionSet) {
        if (action.placement === 'quick')
            quickActionSet.push(action);
        if (action.placement === 'dropdown')
            dropdownActionSet.push(action);
    }
    return { dropdownActionSet, quickActionSet };
}, [messageActionSet]);
