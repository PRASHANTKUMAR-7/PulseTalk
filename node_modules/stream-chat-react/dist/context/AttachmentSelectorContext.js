import React, { createContext, useContext } from 'react';
const AttachmentSelectorContext = createContext({
    fileInput: null,
});
export const AttachmentSelectorContextProvider = ({ children, value, }) => (React.createElement(AttachmentSelectorContext.Provider, { value: value }, children));
export const useAttachmentSelectorContext = () => useContext(AttachmentSelectorContext);
