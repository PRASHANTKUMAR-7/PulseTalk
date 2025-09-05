import { Navigate, Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SighUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import {Toaster} from "react-hot-toast";
import  PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';

const App = () => {
  // const time_to_start=3.10.00;
  //axios for frontend and backend relation
  //react querry or tanstack querry from custome hook useAuthUser
   const {isLoading,authUser}=useAuthUser();//we use user b/c in auth.route we use user
   const isAuthenticated = Boolean(authUser);
   const isOnboarded = authUser?.isOnboarded

  if(isLoading) return <PageLoader/>;


  return (
    <div className="h-screen" data-theme="night">
      {/* <button onClick={()=>toast.error("Hello World")}>Create a Toast</button> //using react hot toast */}
      <Routes>
        <Route path="/" element= {isAuthenticated && isOnboarded?(<HomePage/>):(<Navigate to={!isAuthenticated? "/login" : "/onboarding"}/>)}/>  {/* if authUser is correct means authorised and onboarded user then open homepage unless redirect to login if not autheticate and if yes then onboarded page  */}
        <Route path="/signup" element= {!isAuthenticated?<SignUpPage/> :<Navigate to="/"/>}/> 
        <Route path="/login" element= {!isAuthenticated? <LoginPage/> :<Navigate to="/"/>}/> 
        <Route path="/notification" element= {isAuthenticated? <NotificationPage/> :<Navigate to="/login"/>}/> 
        <Route path="/call" element= {isAuthenticated? <CallPage/> :<Navigate to="/login"/>}/> 
        <Route path="/chat" element= {isAuthenticated? <ChatPage/>:<Navigate to="/login"/>}/> 
        <Route path="/onboarding" element= {isAuthenticated? <OnboardingPage/>:<Navigate to="/login"/>}/> 
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App


