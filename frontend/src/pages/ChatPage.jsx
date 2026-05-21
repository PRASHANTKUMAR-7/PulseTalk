/**
 * ChatPage Component
 * ------------------
 * Main chat page that:
 * - Fetches Stream token from our backend
 * - Connects current user to Stream Chat
 * - Creates/joins a messaging channel between two users
 * - Renders the full chat UI with translation support
 * - Handles video call link generation
 *
 * Split into two components:
 * - ChatPage: handles data fetching and Stream initialization
 * - ChatContent: renders the actual UI (needs TranslationContext so it's separate)
 */

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import LanguageSelector from "../components/LanguageSelector";
import CustomMessage from "../components/CustomMessage";
import { TranslationProvider, TranslationContext } from "../context/TranslationContext";
import toast from "react-hot-toast";

// Stream API key from environment variables
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

/**
 * ChatContent Component
 * ---------------------
 * Inner component that renders the Stream Chat UI.
 * Separated from ChatPage so it can consume TranslationContext
 * (context must be consumed inside its Provider).
 *
 * @param {object} channel - Stream channel instance
 * @param {object} chatClient - Stream client instance
 * @param {function} handleVideoCall - Sends video call link into chat
 */
const ChatContent = ({ channel, chatClient, handleVideoCall }) => {
  // Get language state from TranslationContext
  const { selectedLang, setSelectedLang } = useContext(TranslationContext);

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">

            {/* Video call button in top area */}
            <CallButton handleVideoCall={handleVideoCall} />

            <Window>
              {/* Channel header — shows other user's name/avatar */}
              <ChannelHeader />

              {/* Message list with our CustomMessage component
                  Message prop overrides Stream's default message renderer */}
              <MessageList Message={CustomMessage} />

              {/* Message input box — autofocused */}
              <MessageInput focus />
            </Window>

            {/* Floating language selector button — bottom right of chat */}
            <LanguageSelector
              selectedLang={selectedLang}
              onLanguageChange={setSelectedLang}
            />
          </div>

          {/* Thread panel for message replies */}
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

/**
 * ChatPage (main export)
 * ----------------------
 * Handles all setup logic before rendering the chat UI.
 * Wraps ChatContent in TranslationProvider so translation
 * state is available throughout the chat component tree.
 */
const ChatPage = () => {
  // Get target user ID from URL params e.g. /chat/abc123
  const { id: targetUserId } = useParams();

  // Stream client instance
  const [chatClient, setChatClient] = useState(null);

  // Stream channel instance between current user and target user
  const [channel, setChannel] = useState(null);

  // Loading state while connecting to Stream
  const [loading, setLoading] = useState(true);

  // Current logged in user
  const { authUser } = useAuthUser();

  // Fetch Stream auth token from our backend
  // Only runs when authUser is available
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  /**
   * Effect: Initialize Stream Chat
   * --------------------------------
   * Runs when tokenData or authUser changes.
   * 1. Gets Stream client instance
   * 2. Connects current user with their token
   * 3. Creates a sorted channel ID (same regardless of who initiates)
   * 4. Watches the channel for real-time updates
   */
  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        // Get or create Stream client singleton
        const client = StreamChat.getInstance(STREAM_API_KEY);

        // Connect user to Stream with their profile info
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        // Create consistent channel ID by sorting both user IDs
        // Ensures same channel regardless of who opens the chat first
        const channelId = [authUser._id, targetUserId].sort().join("-");

        // Get or create the messaging channel
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        // Start watching channel for new messages and events
        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);

      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  /**
   * handleVideoCall
   * ---------------
   * Sends a video call link as a message in the channel.
   * The call URL is based on the channel ID so both users join the same room.
   */
  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here ${callUrl}`,
      });
      toast.success("Video Call link sent successfully!");
    }
  };

  // Show loader while Stream is initializing
  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    // TranslationProvider wraps everything so all child components
    // can access translation state via useContext(TranslationContext)
    <TranslationProvider>
      <ChatContent
        channel={channel}
        chatClient={chatClient}
        handleVideoCall={handleVideoCall}
      />
    </TranslationProvider>
  );
};

export default ChatPage;