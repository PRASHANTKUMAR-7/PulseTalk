/// <reference types="react" />
import type { ReactEventHandler } from '../types';
export type EditHandlerReturnType = {
    clearEdit: (event?: React.BaseSyntheticEvent) => void;
    editing: boolean;
    setEdit: ReactEventHandler;
};
export declare const useEditHandler: (customInitialState?: boolean, customSetEditing?: (event?: React.BaseSyntheticEvent) => void, customClearEditingHandler?: (event?: React.BaseSyntheticEvent) => void) => EditHandlerReturnType;
