import throttle from 'lodash.throttle';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import clsx from 'clsx';
import { resampleWaveformData } from '../audioSampling';
export const WaveProgressBar = ({ amplitudesCount = 40, progress = 0, relativeAmplitudeBarWidth = 2, relativeAmplitudeGap = 1, seek, waveformData, }) => {
    const [progressIndicator, setProgressIndicator] = useState(null);
    const isDragging = useRef(false);
    const [root, setRoot] = useState(null);
    const [trackAxisX, setTrackAxisX] = useState();
    const lastRootWidth = useRef(undefined);
    const handleDragStart = (e) => {
        e.preventDefault();
        if (!progressIndicator)
            return;
        isDragging.current = true;
        progressIndicator.style.cursor = 'grabbing';
    };
    const handleDrag = (e) => {
        if (!isDragging.current)
            return;
        // Due to throttling of seek, it is necessary to create a copy (snapshot) of the event.
        // Otherwise, the event would be nullified at the point when the throttled function is executed.
        seek({ ...e });
    };
    const handleDragStop = useCallback(() => {
        if (!progressIndicator)
            return;
        isDragging.current = false;
        progressIndicator.style.removeProperty('cursor');
    }, [progressIndicator]);
    const getTrackAxisX = useMemo(() => throttle((rootWidth) => {
        if (rootWidth === lastRootWidth.current)
            return;
        lastRootWidth.current = rootWidth;
        const possibleAmpCount = Math.floor(rootWidth / (relativeAmplitudeGap + relativeAmplitudeBarWidth));
        const tooManyAmplitudesToRender = possibleAmpCount < amplitudesCount;
        const barCount = tooManyAmplitudesToRender ? possibleAmpCount : amplitudesCount;
        const amplitudeBarWidthToGapRatio = relativeAmplitudeBarWidth / (relativeAmplitudeBarWidth + relativeAmplitudeGap);
        const barWidth = barCount && (rootWidth / barCount) * amplitudeBarWidthToGapRatio;
        setTrackAxisX({
            barCount,
            barWidth,
            gap: barWidth * (relativeAmplitudeGap / relativeAmplitudeBarWidth),
        });
    }, 1), [relativeAmplitudeBarWidth, relativeAmplitudeGap, amplitudesCount]);
    const resampledWaveformData = useMemo(() => (trackAxisX ? resampleWaveformData(waveformData, trackAxisX.barCount) : []), [trackAxisX, waveformData]);
    useEffect(() => {
        document.addEventListener('pointerup', handleDragStop);
        return () => {
            document.removeEventListener('pointerup', handleDragStop);
        };
    }, [handleDragStop]);
    useEffect(() => {
        if (!root || typeof ResizeObserver === 'undefined')
            return;
        const observer = new ResizeObserver(([entry]) => {
            getTrackAxisX(entry.contentRect.width);
        });
        observer.observe(root);
        return () => {
            observer.disconnect();
        };
    }, [getTrackAxisX, root]);
    useLayoutEffect(() => {
        if (!root)
            return;
        const { width: rootWidth } = root.getBoundingClientRect();
        getTrackAxisX(rootWidth);
    }, [getTrackAxisX, root]);
    if (!waveformData.length || trackAxisX?.barCount === 0)
        return null;
    return (React.createElement("div", { className: 'str-chat__wave-progress-bar__track', "data-testid": 'wave-progress-bar-track', onClick: seek, onPointerDown: handleDragStart, onPointerMove: handleDrag, onPointerUp: handleDragStop, ref: setRoot, role: 'progressbar', style: {
            '--str-chat__voice-recording-amplitude-bar-gap-width': trackAxisX?.gap + 'px',
        } },
        resampledWaveformData.map((amplitude, i) => (React.createElement("div", { className: clsx('str-chat__wave-progress-bar__amplitude-bar', {
                ['str-chat__wave-progress-bar__amplitude-bar--active']: progress > (i / resampledWaveformData.length) * 100,
            }), "data-testid": 'amplitude-bar', key: `amplitude-${i}`, style: {
                '--str-chat__voice-recording-amplitude-bar-width': trackAxisX?.barWidth + 'px',
                '--str-chat__wave-progress-bar__amplitude-bar-height': amplitude
                    ? amplitude * 100 + '%'
                    : '0%',
            } }))),
        React.createElement("div", { className: 'str-chat__wave-progress-bar__progress-indicator', "data-testid": 'wave-progress-bar-progress-indicator', ref: setProgressIndicator, style: { left: `${progress < 0 ? 0 : progress > 100 ? 100 : progress}%` } })));
};
