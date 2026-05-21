/**
 * CustomMessage Component
 * -----------------------
 * Replaces Stream Chat's default message bubble.
 * Key responsibilities:
 * - Renders message text with sender avatar, name, and timestamp
 * - Uses IntersectionObserver to detect when message scrolls into view
 * - Only triggers translation when message is actually visible (lazy loading)
 * - Shows original text crossed out + translated text below when active
 * - Shows "Translating..." loading state while API call is in progress
 * - Resets translation when user switches to a different language
 */

import { useEffect, useRef, useState, useContext } from "react";
import { useMessageContext } from "stream-chat-react";
import { TranslationContext } from "../context/TranslationContext";

const CustomMessage = () => {
  // Stream hook — gives us the current message object from Stream Chat
  const { message } = useMessageContext();

  // Get translation state and functions from our context
  const { selectedLang, translateText, translatingIds } = useContext(TranslationContext);

  // Stores the translated version of the message text
  const [translatedText, setTranslatedText] = useState(null);

  // Ref attached to the message container div (used by IntersectionObserver)
  const containerRef = useRef(null);

  // Ref to hold the IntersectionObserver instance (so we can disconnect it)
  const observerRef = useRef(null);

  // Flag to prevent translating the same message multiple times
  // useRef instead of useState so it doesn't cause re-renders
  const hasTranslated = useRef(false);

  // The raw original message text from Stream
  const originalText = message?.text || "";

  // True if this specific message is currently being translated
  const isTranslating = translatingIds.has(message.id);

  /**
   * Effect: Reset translation when language changes
   * ------------------------------------------------
   * When user picks a new language, clear the translated text
   * and reset the hasTranslated flag so it can translate again
   */
  useEffect(() => {
    setTranslatedText(null);
    hasTranslated.current = false;
  }, [selectedLang]);

  /**
   * Effect: Set up IntersectionObserver for lazy translation
   * ---------------------------------------------------------
   * Only runs when selectedLang is not English and there's text to translate.
   * Creates an observer that watches the message container div.
   * When the message scrolls into the viewport (10% visible threshold),
   * it triggers translation and then disconnects the observer.
   */
  useEffect(() => {
    // Skip if English (translation off) or no text
    if (selectedLang === "en" || !originalText) return;

    // Create observer — fires callback when element enters/leaves viewport
    observerRef.current = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        // Only translate when:
        // 1. Message is visible on screen (isIntersecting)
        // 2. Haven't already translated this message (hasTranslated flag)
        if (entry.isIntersecting && !hasTranslated.current) {
          hasTranslated.current = true; // Mark as translated to prevent duplicate calls

          // Call translation (checks cache first, then API)
          const result = await translateText(originalText, selectedLang, message.id);

          // Only update state if we got a result (null = request was cancelled)
          if (result) setTranslatedText(result);

          // Stop observing after successful translation
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of message is visible
    );

    // Start observing the message container div
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    // Cleanup: disconnect observer when component unmounts or language changes
    return () => observerRef.current?.disconnect();
  }, [selectedLang, originalText, message.id, translateText]);

  // Extract display info from Stream message object
  const avatar = message?.user?.image;
  const name = message?.user?.name;

  // Format timestamp to "HH:MM" format
  const time = new Date(message?.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // Container div — observed by IntersectionObserver
    <div ref={containerRef} className="flex items-start gap-2 px-4 py-1 group">

      {/* Sender avatar — only shown if user has a profile image */}
      {avatar && (
        <div className="avatar w-8 h-8 rounded-full shrink-0 mt-1">
          <img src={avatar} alt={name} className="rounded-full" />
        </div>
      )}

      <div className="flex flex-col max-w-[75%]">

        {/* Sender name and message timestamp */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-semibold opacity-70">{name}</span>
          <span className="text-xs opacity-40">{time}</span>
        </div>

        {/* Message bubble */}
        <div className="bg-base-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm">

          {/* Original text
              - Normal appearance when no translation active
              - Crossed out + faded when translated text is shown below */}
          <p className={translatedText ? "opacity-40 text-xs line-through" : ""}>
            {originalText}
          </p>

          {/* Loading indicator — shown while API call is in progress */}
          {isTranslating && (
            <p className="text-xs opacity-50 mt-1 animate-pulse">
              Translating...
            </p>
          )}

          {/* Translated text — shown once translation is complete */}
          {translatedText && !isTranslating && (
            <p className="mt-1 font-medium">{translatedText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomMessage;