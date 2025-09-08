import { useParams } from "react-router"
import useAuthUser from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";


const CallPage = () => {
  const {id:callId} = useParams();
  const [client, setClient] = useState(null);
  const [cal, setCal] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const {data:tokenData}=useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser //this useQuery will run only when user is authorised1
  });

  const{authUser , isLoading} = useAuthUser();

  useEffect(()=>{
    const initCall = async()=>{
      if(!tokenData.data || !authUser || !callId) return;

      try {
        cosole
      } catch (error) {
        
      }
    }
  })
  
  return (
    <div>
      Call Page
    </div>
  )
}

export default CallPage
