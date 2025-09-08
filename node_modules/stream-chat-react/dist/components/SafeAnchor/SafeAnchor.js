import React from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { useTranslationContext } from '../../context';
const UnMemoizedSafeAnchor = (props) => {
    const { children, className, download, href, rel, target } = props;
    const { t } = useTranslationContext('SafeAnchor');
    if (!href)
        return null;
    const sanitized = sanitizeUrl(href);
    return (React.createElement("a", { "aria-label": t('aria/Attachment'), className: className, download: download, href: sanitized, rel: rel, target: target }, children));
};
export const SafeAnchor = React.memo(UnMemoizedSafeAnchor);
