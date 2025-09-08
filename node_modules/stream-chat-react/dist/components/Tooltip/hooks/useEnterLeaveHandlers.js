import { useCallback, useState } from 'react';
export const useEnterLeaveHandlers = ({ onMouseEnter, onMouseLeave, } = {}) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const handleEnter = useCallback((e) => {
        setTooltipVisible(true);
        onMouseEnter?.(e);
    }, [onMouseEnter]);
    const handleLeave = useCallback((e) => {
        setTooltipVisible(false);
        onMouseLeave?.(e);
    }, [onMouseLeave]);
    return { handleEnter, handleLeave, tooltipVisible };
};
