import { useChatContext } from '../../../context';
import { useStateStore } from '../../../store';
export const useThreadManagerState = (selector) => {
    const { client } = useChatContext();
    return useStateStore(client.threads.state, selector);
};
