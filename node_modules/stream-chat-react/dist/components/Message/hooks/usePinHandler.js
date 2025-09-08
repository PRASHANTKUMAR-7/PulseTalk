import { defaultPinPermissions, validateAndGetMessage } from '../utils';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
import { useTranslationContext } from '../../../context/TranslationContext';
export const usePinHandler = (message, 
// @deprecated in favor of `channelCapabilities` - TODO: remove in next major release
_permissions = defaultPinPermissions, // eslint-disable-line
notifications = {}) => {
    const { getErrorNotification, notify } = notifications;
    const { updateMessage } = useChannelActionContext('usePinHandler');
    const { channelCapabilities = {} } = useChannelStateContext('usePinHandler');
    const { client } = useChatContext('usePinHandler');
    const { t } = useTranslationContext('usePinHandler');
    const canPin = !!channelCapabilities['pin-message'];
    const handlePin = async (event) => {
        event.preventDefault();
        if (!message)
            return;
        if (!message.pinned) {
            try {
                const optimisticMessage = {
                    ...message,
                    pinned: true,
                    pinned_at: new Date(),
                    pinned_by: client.user,
                };
                updateMessage(optimisticMessage);
                await client.pinMessage(message);
            }
            catch (e) {
                const errorMessage = getErrorNotification && validateAndGetMessage(getErrorNotification, [message]);
                if (notify)
                    notify(errorMessage || t('Error pinning message'), 'error');
                updateMessage(message);
            }
        }
        else {
            try {
                const optimisticMessage = {
                    ...message,
                    pin_expires: null,
                    pinned: false,
                    pinned_at: null,
                    pinned_by: null,
                };
                updateMessage(optimisticMessage);
                await client.unpinMessage(message);
            }
            catch (e) {
                const errorMessage = getErrorNotification && validateAndGetMessage(getErrorNotification, [message]);
                if (notify)
                    notify(errorMessage || t('Error removing message pin'), 'error');
                updateMessage(message);
            }
        }
    };
    return { canPin, handlePin };
};
