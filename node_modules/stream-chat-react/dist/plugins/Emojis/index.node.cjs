"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugins/Emojis/index.ts
var Emojis_exports = {};
__export(Emojis_exports, {
  EmojiPicker: () => EmojiPicker,
  EmojiPickerIcon: () => EmojiPickerIcon,
  createTextComposerEmojiMiddleware: () => createTextComposerEmojiMiddleware
});
module.exports = __toCommonJS(Emojis_exports);

// src/plugins/Emojis/EmojiPicker.tsx
var import_react10 = __toESM(require("react"));
var import_react_popper = require("react-popper");
var import_react11 = __toESM(require("@emoji-mart/react"));

// src/plugins/Emojis/icons.tsx
var import_react = __toESM(require("react"));
var EmojiPickerIcon = () => /* @__PURE__ */ import_react.default.createElement(
  "svg",
  {
    preserveAspectRatio: "xMinYMin",
    viewBox: "0 0 28 28",
    width: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ import_react.default.createElement("g", { clipRule: "evenodd", fillRule: "evenodd" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M14 4.4C8.6 4.4 4.4 8.6 4.4 14c0 5.4 4.2 9.6 9.6 9.6c5.4 0 9.6-4.2 9.6-9.6c0-5.4-4.2-9.6-9.6-9.6zM2 14c0-6.6 5.4-12 12-12s12 5.4 12 12s-5.4 12-12 12s-12-5.4-12-12zM12.8 11c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8s1.8.8 1.8 1.8zM18.8 11c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8s1.8.8 1.8 1.8zM8.6 15.4c.6-.4 1.2-.2 1.6.2c.6.8 1.6 1.8 3 2c1.2.4 2.8.2 4.8-2c.4-.4 1.2-.6 1.6 0c.4.4.6 1.2 0 1.6c-2.2 2.6-4.8 3.4-7 3c-2-.4-3.6-1.8-4.4-3c-.4-.6-.2-1.2.4-1.8z" }))
);

// src/context/ChannelStateContext.tsx
var import_react2 = __toESM(require("react"));
var ChannelStateContext = import_react2.default.createContext(void 0);
var useChannelStateContext = (componentName) => {
  const contextValue = (0, import_react2.useContext)(ChannelStateContext);
  if (!contextValue) {
    console.warn(
      `The useChannelStateContext hook was called outside of the ChannelStateContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ${componentName} component.`
    );
    return {};
  }
  return contextValue;
};

// src/context/ChatContext.tsx
var import_react3 = __toESM(require("react"));
var ChatContext = import_react3.default.createContext(void 0);
var useChatContext = (componentName) => {
  const contextValue = (0, import_react3.useContext)(ChatContext);
  if (!contextValue) {
    console.warn(
      `The useChatContext hook was called outside of the ChatContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ${componentName} component.`
    );
    return {};
  }
  return contextValue;
};

// src/context/MessageContext.tsx
var import_react4 = __toESM(require("react"));
var MessageContext = import_react4.default.createContext(
  void 0
);
var useMessageContext = (_componentName) => {
  const contextValue = (0, import_react4.useContext)(MessageContext);
  if (!contextValue) {
    return {};
  }
  return contextValue;
};

// src/context/TranslationContext.tsx
var import_react5 = __toESM(require("react"));
var import_dayjs2 = __toESM(require("dayjs"));
var import_calendar = __toESM(require("dayjs/plugin/calendar"));
var import_localizedFormat = __toESM(require("dayjs/plugin/localizedFormat"));

// src/i18n/utils.ts
var import_dayjs = __toESM(require("dayjs"));
var defaultTranslatorFunction = (key) => key;
var defaultDateTimeParser = (input) => (0, import_dayjs.default)(input);

// src/context/TranslationContext.tsx
import_dayjs2.default.extend(import_calendar.default);
import_dayjs2.default.extend(import_localizedFormat.default);
var TranslationContext = import_react5.default.createContext({
  t: defaultTranslatorFunction,
  tDateTimeParser: defaultDateTimeParser,
  userLanguage: "en"
});
var useTranslationContext = (componentName) => {
  const contextValue = (0, import_react5.useContext)(TranslationContext);
  if (!contextValue) {
    console.warn(
      `The useTranslationContext hook was called outside of the TranslationContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ${componentName} component.`
    );
    return {};
  }
  return contextValue;
};

// src/components/MessageInput/hooks/useMessageComposer.ts
var import_react8 = require("react");
var import_stream_chat = require("stream-chat");

// src/components/Threads/ThreadContext.tsx
var import_react6 = __toESM(require("react"));
var ThreadContext = (0, import_react6.createContext)(void 0);
var useThreadContext = () => (0, import_react6.useContext)(ThreadContext);

// src/components/Thread/LegacyThreadContext.ts
var import_react7 = __toESM(require("react"));
var LegacyThreadContext = import_react7.default.createContext({ legacyThread: void 0 });
var useLegacyThreadContext = () => (0, import_react7.useContext)(LegacyThreadContext);

// src/components/MessageInput/hooks/useMessageComposer.ts
var queueCache = new import_stream_chat.FixedSizeQueueCache(64);
var useMessageComposer = () => {
  const { client } = useChatContext();
  const { channel } = useChannelStateContext();
  const { editing, message: editedMessage } = useMessageContext();
  const { legacyThread: parentMessage } = useLegacyThreadContext();
  const threadInstance = useThreadContext();
  const cachedEditedMessage = (0, import_react8.useMemo)(() => {
    if (!editedMessage) return void 0;
    return editedMessage;
  }, [editedMessage?.id]);
  const cachedParentMessage = (0, import_react8.useMemo)(() => {
    if (!parentMessage) return void 0;
    return parentMessage;
  }, [parentMessage?.id]);
  const messageComposer = (0, import_react8.useMemo)(() => {
    if (editing && cachedEditedMessage) {
      const tag = import_stream_chat.MessageComposer.constructTag(cachedEditedMessage);
      const cachedComposer = queueCache.get(tag);
      if (cachedComposer) return cachedComposer;
      return new import_stream_chat.MessageComposer({
        client,
        composition: cachedEditedMessage,
        compositionContext: cachedEditedMessage
      });
    } else if (threadInstance) {
      return threadInstance.messageComposer;
    } else if (cachedParentMessage) {
      const compositionContext = {
        ...cachedParentMessage,
        legacyThreadId: cachedParentMessage.id
      };
      const tag = import_stream_chat.MessageComposer.constructTag(compositionContext);
      const cachedComposer = queueCache.get(tag);
      if (cachedComposer) return cachedComposer;
      return new import_stream_chat.MessageComposer({
        client,
        compositionContext
      });
    } else {
      return channel.messageComposer;
    }
  }, [
    cachedEditedMessage,
    cachedParentMessage,
    channel,
    client,
    editing,
    threadInstance
  ]);
  if (["legacy_thread", "message"].includes(
    messageComposer.contextType
  ) && !queueCache.peek(messageComposer.tag)) {
    queueCache.add(messageComposer.tag, messageComposer);
  }
  (0, import_react8.useEffect)(() => {
    const unsubscribe = messageComposer.registerSubscriptions();
    return () => {
      unsubscribe();
    };
  }, [messageComposer]);
  return messageComposer;
};

// src/context/MessageInputContext.tsx
var import_react9 = __toESM(require("react"));
var MessageInputContext = (0, import_react9.createContext)(
  void 0
);
var useMessageInputContext = (componentName) => {
  const contextValue = (0, import_react9.useContext)(MessageInputContext);
  if (!contextValue) {
    return {};
  }
  return contextValue;
};

// src/plugins/Emojis/EmojiPicker.tsx
var isShadowRoot = (node) => !!node.host;
var classNames = {
  buttonClassName: "str-chat__emoji-picker-button",
  pickerContainerClassName: "str-chat__message-textarea-emoji-picker-container",
  wrapperClassName: "str-chat__message-textarea-emoji-picker"
};
var EmojiPicker = (props) => {
  const { t } = useTranslationContext("EmojiPicker");
  const { textareaRef } = useMessageInputContext("EmojiPicker");
  const { textComposer } = useMessageComposer();
  const [displayPicker, setDisplayPicker] = (0, import_react10.useState)(false);
  const [referenceElement, setReferenceElement] = (0, import_react10.useState)(
    null
  );
  const [popperElement, setPopperElement] = (0, import_react10.useState)(null);
  const { attributes, styles } = (0, import_react_popper.usePopper)(referenceElement, popperElement, {
    placement: "top-end",
    ...props.popperOptions
  });
  const { buttonClassName, pickerContainerClassName, wrapperClassName } = classNames;
  const { ButtonIconComponent = EmojiPickerIcon } = props;
  (0, import_react10.useEffect)(() => {
    if (!popperElement || !referenceElement) return;
    const handlePointerDown = (e) => {
      const target = e.target;
      const rootNode = target.getRootNode();
      if (popperElement.contains(isShadowRoot(rootNode) ? rootNode.host : target) || referenceElement.contains(target)) {
        return;
      }
      setDisplayPicker(false);
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [referenceElement, popperElement]);
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: props.wrapperClassName ?? wrapperClassName }, displayPicker && /* @__PURE__ */ import_react10.default.createElement(
    "div",
    {
      className: props.pickerContainerClassName ?? pickerContainerClassName,
      style: styles.popper,
      ...attributes.popper,
      ref: setPopperElement
    },
    /* @__PURE__ */ import_react10.default.createElement(
      import_react11.default,
      {
        data: async () => (await import("@emoji-mart/data")).default,
        onEmojiSelect: (e) => {
          const textarea = textareaRef.current;
          if (!textarea) return;
          textComposer.insertText({ text: e.native });
          textarea.focus();
          if (props.closeOnEmojiSelect) {
            setDisplayPicker(false);
          }
        },
        ...props.pickerProps
      }
    )
  ), /* @__PURE__ */ import_react10.default.createElement(
    "button",
    {
      "aria-expanded": displayPicker,
      "aria-label": t("aria/Emoji picker"),
      className: props.buttonClassName ?? buttonClassName,
      onClick: () => setDisplayPicker((cv) => !cv),
      ref: setReferenceElement,
      type: "button"
    },
    ButtonIconComponent && /* @__PURE__ */ import_react10.default.createElement(ButtonIconComponent, null)
  ));
};

// src/plugins/Emojis/middleware/textComposerEmojiMiddleware.ts
var import_lodash = __toESM(require("lodash.mergewith"));
var import_stream_chat2 = require("stream-chat");
var EmojiSearchSource = class extends import_stream_chat2.BaseSearchSource {
  constructor(emojiSearchIndex, options) {
    super(options);
    this.type = "emoji";
    this.emojiSearchIndex = emojiSearchIndex;
  }
  async query(searchQuery) {
    if (searchQuery.length === 0) {
      return { items: [], next: null };
    }
    const emojis = await this.emojiSearchIndex.search(searchQuery) ?? [];
    return {
      items: emojis.filter(Boolean).slice(0, 7).map(({ emoticons = [], id, name, native, skins = [] }) => {
        const [firstSkin] = skins;
        return {
          emoticons,
          id,
          name,
          native: native ?? firstSkin.native
        };
      }),
      next: null
      // todo: generate cursor
    };
  }
  filterQueryResults(items) {
    return items.map((item) => ({
      ...item,
      ...(0, import_stream_chat2.getTokenizedSuggestionDisplayName)({
        displayName: item.id,
        searchToken: this.searchQuery
      })
    }));
  }
};
var DEFAULT_OPTIONS = { minChars: 1, trigger: ":" };
var createTextComposerEmojiMiddleware = (emojiSearchIndex, options) => {
  const finalOptions = (0, import_lodash.default)(DEFAULT_OPTIONS, options ?? {});
  const emojiSearchSource = new EmojiSearchSource(emojiSearchIndex);
  emojiSearchSource.activate();
  return {
    id: "stream-io/emoji-middleware",
    // eslint-disable-next-line sort-keys
    handlers: {
      onChange: async ({ complete, forward, next, state }) => {
        if (!state.selection) return forward();
        const triggerWithToken = (0, import_stream_chat2.getTriggerCharWithToken)({
          acceptTrailingSpaces: false,
          text: state.text.slice(0, state.selection.end),
          trigger: finalOptions.trigger
        });
        const triggerWasRemoved = !triggerWithToken || triggerWithToken.length < finalOptions.minChars;
        if (triggerWasRemoved) {
          const hasSuggestionsForTrigger = state.suggestions?.trigger === finalOptions.trigger;
          const newState = { ...state };
          if (hasSuggestionsForTrigger && newState.suggestions) {
            delete newState.suggestions;
          }
          return next(newState);
        }
        const newSearchTriggerred = triggerWithToken && triggerWithToken === finalOptions.trigger;
        if (newSearchTriggerred) {
          emojiSearchSource.resetStateAndActivate();
        }
        const textWithReplacedWord = await (0, import_stream_chat2.replaceWordWithEntity)({
          caretPosition: state.selection.end,
          getEntityString: async (word) => {
            const { items } = await emojiSearchSource.query(word);
            const emoji = items.filter(Boolean).slice(0, 10).find(({ emoticons }) => !!emoticons?.includes(word));
            if (!emoji) return null;
            const [firstSkin] = emoji.skins ?? [];
            return emoji.native ?? firstSkin.native;
          },
          text: state.text
        });
        if (textWithReplacedWord !== state.text) {
          return complete({
            ...state,
            suggestions: void 0,
            // to prevent the TextComposerMiddlewareExecutor to run the first page query
            text: textWithReplacedWord
          });
        }
        return complete({
          ...state,
          suggestions: {
            query: triggerWithToken.slice(1),
            searchSource: emojiSearchSource,
            trigger: finalOptions.trigger
          }
        });
      },
      onSuggestionItemSelect: ({ complete, forward, state }) => {
        const { selectedSuggestion } = state.change ?? {};
        if (!selectedSuggestion || state.suggestions?.trigger !== finalOptions.trigger)
          return forward();
        emojiSearchSource.resetStateAndActivate();
        return complete({
          ...state,
          ...(0, import_stream_chat2.insertItemWithTrigger)({
            insertText: `${"native" in selectedSuggestion ? selectedSuggestion.native : ""} `,
            selection: state.selection,
            text: state.text,
            trigger: finalOptions.trigger
          }),
          suggestions: void 0
          // Clear suggestions after selection
        });
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiPicker,
  EmojiPickerIcon,
  createTextComposerEmojiMiddleware
});
//# sourceMappingURL=index.node.cjs.map
