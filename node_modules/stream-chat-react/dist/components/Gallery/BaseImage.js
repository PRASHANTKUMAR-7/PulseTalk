import React, { forwardRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { DownloadButton } from '../Attachment';
export const BaseImage = forwardRef(function BaseImage({ ...props }, ref) {
    const { className: propsClassName, onError: propsOnError } = props;
    const [error, setError] = useState(false);
    useEffect(() => () => {
        setError(false);
    }, [props.src]);
    return (React.createElement(React.Fragment, null,
        React.createElement("img", { "data-testid": 'str-chat__base-image', ...props, className: clsx(propsClassName, 'str-chat__base-image', {
                'str-chat__base-image--load-failed': error,
            }), onError: (e) => {
                setError(true);
                propsOnError?.(e);
            }, ref: ref }),
        error && React.createElement(DownloadButton, { assetUrl: props.src })));
});
