import type { MessageActionSetItem } from '../MessageActions';
/**
 * Base filter hook which covers actions of type `delete`, `edit`,
 * `flag`, `markUnread`, `mute`, `quote`, `react` and `reply`, whether
 * the rendered message is a reply (replies are limited to certain actions) and
 * whether the message has appropriate type and status.
 */
export declare const useBaseMessageActionSetFilter: (messageActionSet: MessageActionSetItem[], disable?: boolean) => MessageActionSetItem[];
