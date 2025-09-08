import React, { useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
import { BaseImage } from './BaseImage';
import { useTranslationContext } from '../../context';
const onError = (e) => {
    // Prevent having alt attribute on img as the img takes the height of the alt text
    // instead of the CSS / element width & height when the CSS mask (fallback) is applied.
    e.target.alt = '';
};
const renderItem = ({ original, originalAlt }) => (React.createElement(BaseImage, { alt: originalAlt, className: 'image-gallery-image', onError: onError, src: original }));
export const ModalGallery = (props) => {
    const { images, index } = props;
    const { t } = useTranslationContext('ModalGallery');
    const formattedArray = useMemo(() => images.map((image) => {
        const imageSrc = image.image_url || image.thumb_url || '';
        return {
            original: imageSrc,
            originalAlt: t('User uploaded content'),
            source: imageSrc,
        };
    }), [images, t]);
    return (
    // @ts-expect-error ignore the TS error as react-image-gallery was on @types/react@18 while stream-chat-react being upgraded to React 19 (https://github.com/xiaolin/react-image-gallery/issues/809)
    React.createElement(ImageGallery, { items: formattedArray, renderItem: renderItem, showIndex: true, showPlayButton: false, showThumbnails: false, startIndex: index }));
};
