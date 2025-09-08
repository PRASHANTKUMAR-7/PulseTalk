import React from 'react';
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import { ImageComponent } from '../Gallery';
import { SafeAnchor } from '../SafeAnchor';
import { PlayButton, ProgressBar } from './components';
import { useAudioController } from './hooks/useAudioController';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useTranslationContext } from '../../context/TranslationContext';
const getHostFromURL = (url) => {
    if (url !== undefined && url !== null) {
        const [trimmedUrl] = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/');
        return trimmedUrl;
    }
    return null;
};
const UnableToRenderCard = ({ type }) => {
    const { t } = useTranslationContext('Card');
    return (React.createElement("div", { className: clsx('str-chat__message-attachment-card', {
            [`str-chat__message-attachment-card--${type}`]: type,
        }) },
        React.createElement("div", { className: 'str-chat__message-attachment-card--content' },
            React.createElement("div", { className: 'str-chat__message-attachment-card--text' }, t('this content could not be displayed')))));
};
const SourceLink = ({ author_name, url, }) => (React.createElement("div", { className: 'str-chat__message-attachment-card--source-link', "data-testid": 'card-source-link' },
    React.createElement(SafeAnchor, { className: 'str-chat__message-attachment-card--url', href: url, rel: 'noopener noreferrer', target: '_blank' }, author_name || getHostFromURL(url))));
const CardHeader = (props) => {
    const { asset_url, dimensions, image, image_url, thumb_url, title, type } = props;
    let visual = null;
    if (asset_url && type === 'video') {
        visual = (React.createElement(ReactPlayer, { className: 'react-player', controls: true, height: '100%', url: asset_url, width: '100%' }));
    }
    else if (image) {
        visual = (React.createElement(ImageComponent, { dimensions: dimensions, fallback: title || image, image_url: image_url, thumb_url: thumb_url }));
    }
    return visual ? (React.createElement("div", { className: 'str-chat__message-attachment-card--header str-chat__message-attachment-card-react--header', "data-testid": 'card-header' }, visual)) : null;
};
const CardContent = (props) => {
    const { author_name, og_scrape_url, text, title, title_link, type } = props;
    const url = title_link || og_scrape_url;
    return (React.createElement("div", { className: 'str-chat__message-attachment-card--content' }, type === 'audio' ? (React.createElement(CardAudio, { og: props })) : (React.createElement("div", { className: 'str-chat__message-attachment-card--flex' },
        url && React.createElement(SourceLink, { author_name: author_name, url: url }),
        title && (React.createElement("div", { className: 'str-chat__message-attachment-card--title' }, title)),
        text && React.createElement("div", { className: 'str-chat__message-attachment-card--text' }, text)))));
};
export const CardAudio = ({ og: { asset_url, author_name, mime_type, og_scrape_url, text, title, title_link }, }) => {
    const { audioRef, isPlaying, progress, seek, togglePlay } = useAudioController({
        mimeType: mime_type,
    });
    const url = title_link || og_scrape_url;
    const dataTestId = 'card-audio-widget';
    const rootClassName = 'str-chat__message-attachment-card-audio-widget';
    return (React.createElement("div", { className: rootClassName, "data-testid": dataTestId },
        asset_url && (React.createElement(React.Fragment, null,
            React.createElement("audio", { ref: audioRef },
                React.createElement("source", { "data-testid": 'audio-source', src: asset_url, type: 'audio/mp3' })),
            React.createElement("div", { className: 'str-chat__message-attachment-card-audio-widget--first-row' },
                React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--play-controls' },
                    React.createElement(PlayButton, { isPlaying: isPlaying, onClick: togglePlay })),
                React.createElement(ProgressBar, { onClick: seek, progress: progress })))),
        React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--second-row' },
            url && React.createElement(SourceLink, { author_name: author_name, url: url }),
            title && (React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--title' }, title)),
            text && (React.createElement("div", { className: 'str-chat__message-attachment-audio-widget--description' }, text)))));
};
const UnMemoizedCard = (props) => {
    const { asset_url, giphy, image_url, thumb_url, title, title_link, type } = props;
    const { giphyVersion: giphyVersionName } = useChannelStateContext('CardHeader');
    let image = thumb_url || image_url;
    const dimensions = {};
    if (type === 'giphy' && typeof giphy !== 'undefined') {
        const giphyVersion = giphy[giphyVersionName];
        image = giphyVersion.url;
        dimensions.height = giphyVersion.height;
        dimensions.width = giphyVersion.width;
    }
    if (!title && !title_link && !asset_url && !image) {
        return React.createElement(UnableToRenderCard, null);
    }
    return (React.createElement("div", { className: `str-chat__message-attachment-card str-chat__message-attachment-card--${type}` },
        React.createElement(CardHeader, { ...props, dimensions: dimensions, image: image }),
        React.createElement(CardContent, { ...props })));
};
/**
 * Simple Card Layout for displaying links
 */
export const Card = React.memo(UnMemoizedCard);
