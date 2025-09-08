import React from 'react';
import { useTranslationContext } from '../../context';
export const RecordingPermissionDeniedNotification = ({ onClose, permissionName, }) => {
    const { t } = useTranslationContext();
    const permissionTranslations = {
        body: {
            camera: t('To start recording, allow the camera access in your browser'),
            microphone: t('To start recording, allow the microphone access in your browser'),
        },
        heading: {
            camera: t('Allow access to camera'),
            microphone: t('Allow access to microphone'),
        },
    };
    return (React.createElement("div", { className: 'str-chat__recording-permission-denied-notification' },
        React.createElement("div", { className: 'str-chat__recording-permission-denied-notification__heading' }, permissionTranslations.heading[permissionName]),
        React.createElement("p", { className: 'str-chat__recording-permission-denied-notification__message' }, permissionTranslations.body[permissionName]),
        React.createElement("div", { className: 'str-chat__recording-permission-denied-notification__dismiss-button-container' },
            React.createElement("button", { className: 'str-chat__recording-permission-denied-notification__dismiss-button', onClick: onClose }, t('Ok')))));
};
