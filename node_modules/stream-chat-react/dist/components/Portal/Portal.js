import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
export const Portal = ({ children, getPortalDestination, isOpen, }) => {
    const [portalDestination, setPortalDestination] = useState(null);
    useLayoutEffect(() => {
        const destination = getPortalDestination();
        if (!destination || !isOpen)
            return;
        setPortalDestination(destination);
    }, [getPortalDestination, isOpen]);
    if (!portalDestination)
        return null;
    return createPortal(children, portalDestination);
};
