export const isMutableRef = (ref) => {
    if (ref) {
        return ref.current !== undefined;
    }
    return false;
};
export const getImageDimensions = (source) => new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
        resolve([image.width, image.height]);
    }, { once: true });
    image.addEventListener('error', () => reject(`Couldn't load image from ${source}`), {
        once: true,
    });
    image.src = source;
});
