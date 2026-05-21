/**
 * ChatHeader Component
 * --------------------
 * Displays the top bar of the chat page.
 * Contains:
 * - Home button to navigate back to home page
 * - Video call button to send call link in chat
 */

import { HomeIcon } from "lucide-react";
import { Link } from "react-router";
import CallButton from "./CallButton";

/**
 * @param {function} handleVideoCall - Sends video call link into chat
 */
const ChatHeader = ({ handleVideoCall }) => {
  return (
    <div className="flex items-center bg-base-200 border-b border-base-300 px-4 py-2">
      {/* Home button — navigates back to home page */}
      <Link to="/">
        <button className="btn btn-sm btn-ghost gap-1">
          <HomeIcon className="h-4 w-4" />
          Home
        </button>
      </Link>

      {/* Video call button */}
      <CallButton handleVideoCall={handleVideoCall} />
    </div>
  );
};

export default ChatHeader;