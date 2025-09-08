import type { MessageActionSetItem } from '../MessageActions';
export declare const useSplitMessageActionSet: (messageActionSet: MessageActionSetItem[]) => {
    dropdownActionSet: MessageActionSetItem[];
    quickActionSet: MessageActionSetItem[];
};
