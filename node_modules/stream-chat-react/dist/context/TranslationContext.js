import React, { useContext } from 'react';
import Dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getDisplayName } from './utils/getDisplayName';
import { defaultDateTimeParser, defaultTranslatorFunction } from '../i18n/utils';
Dayjs.extend(calendar);
Dayjs.extend(localizedFormat);
export const TranslationContext = React.createContext({
    t: defaultTranslatorFunction,
    tDateTimeParser: defaultDateTimeParser,
    userLanguage: 'en',
});
export const TranslationProvider = ({ children, value, }) => (React.createElement(TranslationContext.Provider, { value: value }, children));
export const useTranslationContext = (componentName) => {
    const contextValue = useContext(TranslationContext);
    if (!contextValue) {
        console.warn(`The useTranslationContext hook was called outside of the TranslationContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
export const withTranslationContext = (Component) => {
    const WithTranslationContextComponent = (props) => {
        const translationContext = useTranslationContext();
        return React.createElement(Component, { ...props, ...translationContext });
    };
    WithTranslationContextComponent.displayName = `WithTranslationContext${getDisplayName(Component)}`;
    return WithTranslationContextComponent;
};
