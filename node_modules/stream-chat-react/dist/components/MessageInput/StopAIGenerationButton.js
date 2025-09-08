import React from 'react';
import { useTranslationContext } from '../../context';
export const StopAIGenerationButton = ({ onClick, ...restProps }) => {
    const { t } = useTranslationContext();
    return (React.createElement("button", { "aria-label": t('aria/Stop AI Generation'), className: 'str-chat__stop-ai-generation-button', "data-testid": 'stop-ai-generation-button', onClick: onClick, ...restProps }));
};
