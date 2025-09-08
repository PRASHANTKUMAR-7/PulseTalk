import { useSelectedChannelState } from './useSelectedChannelState';
const selector = (c) => c.state.membership;
const keys = ['member.updated'];
export function useChannelMembershipState(channel) {
    return useSelectedChannelState({ channel, selector, stateChangeEventKeys: keys });
}
