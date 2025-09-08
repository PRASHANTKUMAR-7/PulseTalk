import { useChatContext, useTranslationContext } from '../../../context';
export const MAX_MESSAGE_REACTIONS_TO_FETCH = 1000;
export function useReactionsFetcher(message, notifications = {}) {
    const { client } = useChatContext('useRectionsFetcher');
    const { t } = useTranslationContext('useReactionFetcher');
    const { getErrorNotification, notify } = notifications;
    return async (reactionType, sort) => {
        try {
            return await fetchMessageReactions(client, message.id, reactionType, sort);
        }
        catch (e) {
            const errorMessage = getErrorNotification?.(message);
            notify?.(errorMessage || t('Error fetching reactions'), 'error');
            throw e;
        }
    };
}
async function fetchMessageReactions(client, messageId, reactionType, sort) {
    const reactions = [];
    const limit = 25;
    let next;
    let hasNext = true;
    while (hasNext && reactions.length < MAX_MESSAGE_REACTIONS_TO_FETCH) {
        const response = await client.queryReactions(messageId, reactionType ? { type: reactionType } : {}, sort, { limit, next });
        reactions.push(...response.reactions);
        next = response.next;
        hasNext = Boolean(next);
    }
    return reactions;
}
