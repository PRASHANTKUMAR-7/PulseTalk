import React, { useEffect, useState } from 'react';
import { CustomNotification } from './CustomNotification';
import { useChatContext, useTranslationContext } from '../../context';
const UnMemoizedConnectionStatus = () => {
    const { client } = useChatContext('ConnectionStatus');
    const { t } = useTranslationContext('ConnectionStatus');
    const [online, setOnline] = useState(true);
    useEffect(() => {
        const connectionChanged = ({ online: onlineStatus = false }) => {
            if (online !== onlineStatus) {
                setOnline(onlineStatus);
            }
        };
        client.on('connection.changed', connectionChanged);
        return () => client.off('connection.changed', connectionChanged);
    }, [client, online]);
    return (React.createElement(CustomNotification, { active: !online, className: 'str-chat__connection-status-notification', type: 'error' }, t('Connection failure, reconnecting now...')));
};
export const ConnectionStatus = React.memo(UnMemoizedConnectionStatus);
