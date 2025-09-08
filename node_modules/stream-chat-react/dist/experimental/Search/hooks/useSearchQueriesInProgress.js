import { useEffect, useState } from 'react';
import { useStateStore } from '../../../store';
const searchControllerStateSelector = (value) => ({
    sources: value.sources,
});
export const useSearchQueriesInProgress = (searchController) => {
    const [queriesInProgress, setQueriesInProgress] = useState([]);
    const { sources } = useStateStore(searchController.state, searchControllerStateSelector);
    useEffect(() => {
        const subscriptions = sources.map((source) => source.state.subscribeWithSelector((value) => ({ isLoading: value.isLoading }), ({ isLoading }) => {
            setQueriesInProgress((prev) => {
                if (isLoading)
                    return prev.concat(source.type);
                return prev.filter((type) => type !== source.type);
            });
        }));
        return () => {
            subscriptions.forEach((unsubscribe) => unsubscribe());
        };
    }, [sources]);
    return queriesInProgress;
};
