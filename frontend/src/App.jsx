import { Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SighUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import toast, {Toaster} from "react-hot-toast";

const App = () => {
  //axios 
  //react querry or tanstack querry

  return (
    <div className="h-screen" data-theme="night">
      {/* <button onClick={()=>toast.error("Hello World")}>Create a Toast</button> //using react hot toast */}
      <Routes>
        <Route path="/" element= {<HomePage/>}></Route>
        <Route path="/signup" element= {<SignUpPage/>}></Route>
        <Route path="/login" element= {<LoginPage/>}></Route>
        <Route path="/notification" element= {<NotificationPage/>}></Route>
        <Route path="/call" element= {<CallPage/>}></Route>
        <Route path="/chat" element= {<ChatPage/>}></Route>
        <Route path="/onboarding" element= {<OnboardingPage/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
