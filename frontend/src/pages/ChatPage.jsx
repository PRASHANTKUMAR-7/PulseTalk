import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY
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


const ChatPage = () => {
  const {id:targetUserId}=useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const {authUser} = useAuthUser();

  const {data:tokenData}=useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser //this useQuery will run only when user is authorised1
  });

  useEffect(()=>{
    const initChat = async ()=>{
      if (!tokenData?.token || !authUser) return;

      try { //this whole try block handel chat 
        console.log("Initializing stream chat client...");
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({ //conecting user
          id:authUser._id,
          name: authUser.fullName,
          image:authUser.profilePic,
        },tokenData.token)
        
        const channelId = [authUser._id, targetUserId].sort().join("-"); //creating a channel id
        // you and me
        // if i start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId](both are same but for human not for computer so sort, after sorting) => [myId, yourId]

        const currChannel = client.channel("messaging",channelId,{ //creating message channel
          members: [authUser._id , targetUserId],
        });
        await currChannel.watch(); //listing for any changes

        setChatClient(client);
        setChannel(currChannel);

      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } 
      finally {
       setLoading(false);
      }
    };
    initChat();
  },[tokenData,authUser,targetUserId]);


//handling video call--------
  const handleVideoCall =()=>{

  };



  if(loading || !chatClient || !channel) return <ChatLoader/>;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
