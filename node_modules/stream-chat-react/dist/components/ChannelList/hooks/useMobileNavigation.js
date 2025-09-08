import { useEffect } from 'react';
export const useMobileNavigation = (channelListRef, navOpen, closeMobileNav) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (closeMobileNav &&
                channelListRef.current &&
                !channelListRef.current.contains(event.target) &&
                navOpen) {
                closeMobileNav();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [channelListRef, closeMobileNav, navOpen]);
};
