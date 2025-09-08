import { useState } from 'react';
export const useChannelsQueryState = () => {
    const [error, setError] = useState(null);
    const [queryInProgress, setQueryInProgress] = useState('uninitialized');
    return {
        error,
        queryInProgress,
        setError,
        setQueryInProgress,
    };
};
