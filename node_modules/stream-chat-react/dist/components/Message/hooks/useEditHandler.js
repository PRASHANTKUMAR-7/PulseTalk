import { useState } from 'react';
export const useEditHandler = (customInitialState = false, customSetEditing, customClearEditingHandler) => {
    const [editing, setEditing] = useState(customInitialState);
    const setEdit = customSetEditing ||
        ((event) => {
            if (event?.preventDefault) {
                event.preventDefault();
            }
            setEditing(true);
        });
    const clearEdit = customClearEditingHandler ||
        ((event) => {
            if (event?.preventDefault) {
                event.preventDefault();
            }
            setEditing(false);
        });
    return { clearEdit, editing, setEdit };
};
