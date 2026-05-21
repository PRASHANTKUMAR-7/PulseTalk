/**
 * TranslationContext
 * ------------------
 * React Context that shares translation state across all chat components.
 * Wraps the chat page so CustomMessage components can access:
 * - selectedLang: currently chosen language
 * - setSelectedLang: function to change language + save to localStorage
 * - translateText: the translation function from useTranslation hook
 * - translatingIds: set of message IDs currently being translated
 */

import { createContext, useState, useCallback } from "react";
import { useTranslation } from "../hooks/useTranslation";

// Create the context object (initially null, filled by Provider)
export const TranslationContext = createContext(null);

/**
 * TranslationProvider
 * -------------------
 * Wraps children with translation state.
 * - Reads saved language from localStorage on first load
 * - Saves language preference to localStorage whenever it changes
 */
export const TranslationProvider = ({ children }) => {
  // Initialize language from localStorage (persists across sessions)
  // Falls back to "en" (English = translation off) if nothing saved
  const [selectedLang, setSelectedLang] = useState(
    () => localStorage.getItem("preferredLang") || "en"
  );

  // Get translation utilities from the custom hook
  const { translateText, translatingIds } = useTranslation();

  /**
   * handleLanguageChange
   * --------------------
   * Updates selected language in state AND saves it to localStorage.
   * useCallback prevents unnecessary re-renders of child components.
   */
  const handleLanguageChange = useCallback((lang) => {
    setSelectedLang(lang);
    localStorage.setItem("preferredLang", lang); // Persist across page refresh
  }, []);

  return (
    <TranslationContext.Provider
      value={{
        selectedLang,                        // Current language code e.g. "hi"
        setSelectedLang: handleLanguageChange,// Language change handler
        translateText,                        // Translation function
        translatingIds,                       // Set of currently translating message IDs
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};