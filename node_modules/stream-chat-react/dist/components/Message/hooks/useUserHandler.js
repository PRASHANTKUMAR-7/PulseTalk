export const useUserHandler = (message, eventHandlers) => ({
    onUserClick: (event) => {
        if (typeof eventHandlers?.onUserClickHandler !== 'function' || !message?.user) {
            return;
        }
        eventHandlers.onUserClickHandler(event, message.user);
    },
    onUserHover: (event) => {
        if (typeof eventHandlers?.onUserHoverHandler !== 'function' || !message?.user) {
            return;
        }
        eventHandlers.onUserHoverHandler(event, message.user);
    },
});
