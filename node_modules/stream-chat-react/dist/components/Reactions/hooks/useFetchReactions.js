import { useEffect, useState } from 'react';
import { useMessageContext } from '../../../context';
export function useFetchReactions(options) {
    const { handleFetchReactions: contextHandleFetchReactions } = useMessageContext('useFetchReactions');
    const [reactions, setReactions] = useState([]);
    const { handleFetchReactions: propHandleFetchReactions, reactionType, shouldFetch, sort, } = options;
    const [isLoading, setIsLoading] = useState(shouldFetch);
    const handleFetchReactions = propHandleFetchReactions ?? contextHandleFetchReactions;
    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        let cancel = false;
        (async () => {
            try {
                setIsLoading(true);
                const reactions = await handleFetchReactions(reactionType, sort);
                if (!cancel) {
                    setReactions(reactions);
                }
            }
            catch (e) {
                if (!cancel) {
                    setReactions([]);
                }
            }
            finally {
                if (!cancel) {
                    setIsLoading(false);
                }
            }
        })();
        return () => {
            cancel = true;
        };
    }, [handleFetchReactions, reactionType, shouldFetch, sort]);
    return { isLoading, reactions };
}
