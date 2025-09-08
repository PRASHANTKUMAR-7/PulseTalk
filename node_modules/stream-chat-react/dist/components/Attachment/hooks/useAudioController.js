import throttle from 'lodash.throttle';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChannelActionContext, useTranslationContext } from '../../../context';
const isSeekable = (audioElement) => !(audioElement.duration === Infinity || isNaN(audioElement.duration));
export const elementIsPlaying = (audioElement) => audioElement && !(audioElement.paused || audioElement.ended);
const logError = (e) => console.error('[AUDIO PLAYER]', e);
const DEFAULT_PLAYBACK_RATES = [1.0, 1.5, 2.0];
export const useAudioController = ({ durationSeconds, mimeType, playbackRates = DEFAULT_PLAYBACK_RATES, } = {}) => {
    const { addNotification } = useChannelActionContext('useAudioController');
    const { t } = useTranslationContext('useAudioController');
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackError, setPlaybackError] = useState();
    const [canPlayRecord, setCanPlayRecord] = useState(true);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [playbackRateIndex, setPlaybackRateIndex] = useState(0);
    const playTimeout = useRef(undefined);
    const audioRef = useRef(null);
    const registerError = useCallback((e) => {
        logError(e);
        setPlaybackError(e);
        addNotification(e.message, 'error');
    }, [addNotification]);
    const togglePlay = useCallback(async () => {
        if (!audioRef.current)
            return;
        clearTimeout(playTimeout.current);
        playTimeout.current = undefined;
        if (mimeType && !audioRef.current.canPlayType(mimeType)) {
            registerError(new Error(t('Recording format is not supported and cannot be reproduced')));
            setCanPlayRecord(false);
            return;
        }
        if (elementIsPlaying(audioRef.current)) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
        else {
            playTimeout.current = setTimeout(() => {
                if (!audioRef.current)
                    return;
                try {
                    audioRef.current.pause();
                    setIsPlaying(false);
                }
                catch (e) {
                    registerError(new Error(t('Failed to play the recording')));
                }
            }, 2000);
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            }
            catch (e) {
                registerError(e);
                setIsPlaying(false);
            }
            finally {
                clearTimeout(playTimeout.current);
                playTimeout.current = undefined;
            }
        }
    }, [mimeType, registerError, t]);
    const increasePlaybackRate = () => {
        setPlaybackRateIndex((prev) => {
            if (!audioRef.current)
                return prev;
            const nextIndex = prev === playbackRates.length - 1 ? 0 : prev + 1;
            audioRef.current.playbackRate = playbackRates[nextIndex];
            return nextIndex;
        });
    };
    const seek = useMemo(() => throttle(({ clientX, currentTarget }) => {
        if (!(currentTarget && audioRef.current))
            return;
        if (!isSeekable(audioRef.current)) {
            registerError(new Error(t('Cannot seek in the recording')));
            return;
        }
        const { width, x } = currentTarget.getBoundingClientRect();
        const ratio = (clientX - x) / width;
        if (ratio > 1 || ratio < 0)
            return;
        const currentTime = ratio * audioRef.current.duration;
        setSecondsElapsed(currentTime);
        audioRef.current.currentTime = currentTime;
    }, 16), [registerError, t]);
    useEffect(() => {
        if (!audioRef.current)
            return;
        const audioElement = audioRef.current;
        const handleEnded = () => {
            setSecondsElapsed(audioElement?.duration ?? durationSeconds ?? 0);
            setIsPlaying(false);
        };
        audioElement.addEventListener('ended', handleEnded);
        const handleError = () => {
            addNotification(t('Error reproducing the recording'), 'error');
            setIsPlaying(false);
        };
        audioElement.addEventListener('error', handleError);
        const handleTimeupdate = () => {
            setSecondsElapsed(audioElement?.currentTime);
        };
        audioElement.addEventListener('timeupdate', handleTimeupdate);
        return () => {
            audioElement.pause();
            audioElement.removeEventListener('ended', handleEnded);
            audioElement.removeEventListener('error', handleError);
            audioElement.removeEventListener('timeupdate', handleTimeupdate);
        };
    }, [addNotification, durationSeconds, t]);
    return {
        audioRef,
        canPlayRecord,
        increasePlaybackRate,
        isPlaying,
        playbackError,
        playbackRate: playbackRates[playbackRateIndex],
        progress: audioRef.current && secondsElapsed
            ? (secondsElapsed / audioRef.current.duration) * 100
            : 0,
        secondsElapsed,
        seek,
        togglePlay,
    };
};
