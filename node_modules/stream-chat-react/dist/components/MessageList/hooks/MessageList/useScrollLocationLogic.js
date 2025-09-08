import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useMessageListScrollManager } from './useMessageListScrollManager';
export const useScrollLocationLogic = (params) => {
    const { hasMoreNewer, listElement, loadMoreScrollThreshold, messages = [], scrolledUpThreshold = 200, suppressAutoscroll, } = params;
    const [hasNewMessages, setHasNewMessages] = useState(false);
    const [wrapperRect, setWrapperRect] = useState();
    const [isMessageListScrolledToBottom, setIsMessageListScrolledToBottom] = useState(true);
    const closeToBottom = useRef(false);
    const closeToTop = useRef(false);
    const scrollToBottom = useCallback(() => {
        if (!listElement?.scrollTo || hasMoreNewer || suppressAutoscroll) {
            return;
        }
        listElement.scrollTo({
            top: listElement.scrollHeight,
        });
        setHasNewMessages(false);
    }, [listElement, hasMoreNewer, suppressAutoscroll]);
    useLayoutEffect(() => {
        if (listElement) {
            setWrapperRect(listElement.getBoundingClientRect());
            scrollToBottom();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listElement, hasMoreNewer]);
    const updateScrollTop = useMessageListScrollManager({
        loadMoreScrollThreshold,
        messages,
        onScrollBy: (scrollBy) => {
            listElement?.scrollBy({ top: scrollBy });
        },
        scrollContainerMeasures: () => ({
            offsetHeight: listElement?.offsetHeight || 0,
            scrollHeight: listElement?.scrollHeight || 0,
        }),
        scrolledUpThreshold,
        scrollToBottom,
        showNewMessages: () => setHasNewMessages(true),
    });
    const onScroll = useCallback((event) => {
        const element = event.target;
        const scrollTop = element.scrollTop;
        updateScrollTop(scrollTop);
        const offsetHeight = element.offsetHeight;
        const scrollHeight = element.scrollHeight;
        const prevCloseToBottom = closeToBottom.current;
        closeToBottom.current =
            scrollHeight - (scrollTop + offsetHeight) < scrolledUpThreshold;
        closeToTop.current = scrollTop < scrolledUpThreshold;
        if (closeToBottom.current) {
            setHasNewMessages(false);
        }
        if (prevCloseToBottom && !closeToBottom.current) {
            setIsMessageListScrolledToBottom(false);
        }
        else if (!prevCloseToBottom && closeToBottom.current) {
            setIsMessageListScrolledToBottom(true);
        }
    }, [updateScrollTop, closeToTop, closeToBottom, scrolledUpThreshold]);
    return {
        hasNewMessages,
        isMessageListScrolledToBottom,
        onScroll,
        scrollToBottom,
        wrapperRect,
    };
};
