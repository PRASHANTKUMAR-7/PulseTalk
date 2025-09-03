import { Navigate, Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SighUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import {Toaster} from "react-hot-toast";
import {useQuery} from "@tanstack/react-query";
import { axiosInstance } from './lib/axios.js';
import  ConversationLoader from './components/ConversationLoader.jsx';

const App = () => {
  // const time_to_start=2.49.00;
  //axios for frontend and backend relation
  //react querry or tanstack querry
  const {data:authData,
    isLoading,
    error,} = useQuery({//this has a great feature that if it(useQuery/teanstack) fails then it try more then once to execute on the other hand usestate will try single time
    queryKey: ["authUser"], //used in signup page
    queryFn: async()=>{
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false, //if you dont want to retry more than once
  });
  const authUser=authData?.user; //we use user b/c in auth.route we use user

  if(isLoading) return <ConversationLoader/>


  return (
    <div className="h-screen" data-theme="night">
      {/* <button onClick={()=>toast.error("Hello World")}>Create a Toast</button> //using react hot toast */}
      <Routes>
        <Route path="/" element= {authUser? <HomePage/> :<Navigate to="/login"/>}/>  {/* if authUser is correct means authorised user then open homepage unless redirect to login page  */}
        <Route path="/signup" element= {!authUser?<SignUpPage/> :<Navigate to="/"/>}/> 
        <Route path="/login" element= {!authUser? <LoginPage/> :<Navigate to="/"/>}/> 
        <Route path="/notification" element= {authUser? <NotificationPage/> :<Navigate to="/login"/>}/> 
        <Route path="/call" element= {authUser? <CallPage/> :<Navigate to="/login"/>}/> 
        <Route path="/chat" element= {authUser? <ChatPage/>:<Navigate to="/login"/>}/> 
        <Route path="/onboarding" element= {authUser? <OnboardingPage/>:<Navigate to="/login"/>}/> 
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App


