/**
 * useTranslation Hook
 * ------------------
 * Handles all translation logic for the chat.
 * - Calls MyMemory API to translate text (free, no API key needed)
 * - Caches results so same message isn't translated twice
 * - Tracks which messages are currently being translated
 * - Cancels ongoing requests if language changes mid-flight
 */

import { useState, useRef, useCallback } from "react";

// MyMemory free translation API
// Format: GET request with text + language pair
// langpair format: "sourceLanguage|targetLanguage" e.g. "en|hi"
// "auto" is not supported — we use "en" as default source
const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

// Global cache outside component so it persists across re-renders
// Key format: "messageId_targetLang" → translated text
const translationCache = new Map();

export function useTranslation() {
  // Tracks IDs of messages currently being translated (shows loading state)
  const [translatingIds, setTranslatingIds] = useState(new Set());

  // Stores AbortControllers per messageId so we can cancel in-flight requests
  const abortControllers = useRef(new Map());

  /**
   * translateText
   * -------------
   * Main translation function.
   * @param {string} text - Original message text to translate
   * @param {string} targetLang - Language code to translate into (e.g. "hi", "fr")
   * @param {string} messageId - Unique Stream message ID (used for caching)
   * @returns {string} - Translated text, or original text if translation fails
   */
  const translateText = useCallback(async (text, targetLang, messageId) => {
    // Skip translation if target is English (default) or text is empty
    if (targetLang === "en" || !text?.trim()) return text;

    // Build cache key from messageId + language
    const cacheKey = `${messageId}_${targetLang}`;

    // Return cached result immediately if available (avoids repeat API calls)
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    // Cancel any previous in-flight request for this message
    if (abortControllers.current.has(messageId)) {
      abortControllers.current.get(messageId).abort();
    }

    // Create new abort controller for this request
    const controller = new AbortController();
    abortControllers.current.set(messageId, controller);

    // Add messageId to translating set → triggers loading UI
    setTranslatingIds((prev) => new Set(prev).add(messageId));

    try {
      // MyMemory uses a simple GET request with query params
      // langpair: "en|hi" means translate from English to Hindi
      const params = new URLSearchParams({
        q: text,                      // Text to translate
        langpair: `en|${targetLang}`, // Source|Target language pair
      });

      const response = await fetch(`${MYMEMORY_URL}?${params}`, {
        method: "GET",
        signal: controller.signal, // Attach abort signal for cancellation
      });

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();

      // MyMemory returns translated text in data.responseData.translatedText
      // Falls back to original text if response is empty or malformed
      const translated = data?.responseData?.translatedText || text;

      // Store in cache to avoid translating same message again
      translationCache.set(cacheKey, translated);
      return translated;

    } catch (error) {
      // Request was intentionally cancelled (language switched mid-flight)
      if (error.name === "AbortError") return null;

      // Any other error → log it and return original text as fallback
      console.error("Translation error:", error);
      return text;

    } finally {
      // Always clean up — remove from loading set and delete controller
      setTranslatingIds((prev) => {
        const next = new Set(prev);
        next.delete(messageId);
        return next;
      });
      abortControllers.current.delete(messageId);
    }
  }, []);

  return { translateText, translatingIds };
}