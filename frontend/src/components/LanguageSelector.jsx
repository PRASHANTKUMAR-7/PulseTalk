/**
 * LanguageSelector Component
 * --------------------------
 * A floating button that opens a language dropdown menu.
 * - Sits in the bottom-right corner of the chat window
 * - Shows a badge with current language code when translation is active
 * - Highlights the currently selected language in the dropdown
 * - Passes selected language up to parent via onLanguageChange callback
 */

import { useState } from "react";
import { LanguagesIcon } from "lucide-react";

// All supported languages
// code: ISO 639-1 language code used by LibreTranslate API
// label: Human readable name shown in dropdown
const LANGUAGES = [
  { code: "en", label: "English (Off)" }, // "Off" because English = no translation
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh", label: "Chinese" },
  { code: "ar", label: "Arabic" },
  { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "it", label: "Italian" },
  { code: "bn", label: "Bengali" },
  { code: "ur", label: "Urdu" },
];

/**
 * @param {string} selectedLang - Currently active language code
 * @param {function} onLanguageChange - Callback when user picks a new language
 */
const LanguageSelector = ({ selectedLang, onLanguageChange }) => {
  // Controls whether the dropdown list is visible
  const [isOpen, setIsOpen] = useState(false);

  // Find the full language object for the currently selected code
  const current = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    // Positioned absolutely inside the chat window container
    <div className="absolute bottom-20 right-4 z-50">

      {/* Dropdown list — only rendered when isOpen is true */}
      {isOpen && (
        <div className="mb-2 bg-base-200 border border-base-300 rounded-xl shadow-xl w-44 max-h-64 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code); // Notify parent of selection
                setIsOpen(false);            // Close dropdown after selection
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-base-300 
                transition-colors first:rounded-t-xl last:rounded-b-xl 
                ${selectedLang === lang.code ? "bg-primary text-primary-content" : ""}
              `}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}

      {/* Main floating toggle button
          - Shows as primary (colored) when translation is active
          - Shows as neutral (grey) when set to English (off) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`btn btn-circle shadow-lg ${
          selectedLang !== "en" ? "btn-primary" : "btn-neutral"
        }`}
        title="Translate messages"
      >
        <LanguagesIcon className="h-5 w-5" />
      </button>

      {/* Small badge showing active language code (e.g. "HI", "FR")
          Only visible when translation is active (not English) */}
      {selectedLang !== "en" && (
        <span className="absolute -top-2 -left-2 badge badge-secondary badge-sm font-bold uppercase">
          {selectedLang}
        </span>
      )}
    </div>
  );
};

export default LanguageSelector;