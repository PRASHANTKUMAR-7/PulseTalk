import { Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SighUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

const App = () => {
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element= {<HomePage/>}></Route>
        <Route path="/signup" element= {<SignUpPage/>}></Route>
        <Route path="/login" element= {<LoginPage/>}></Route>
        <Route path="/notification" element= {<NotificationPage/>}></Route>
        <Route path="/call" element= {<CallPage/>}></Route>
        <Route path="/chat" element= {<ChatPage/>}></Route>
        <Route path="/onboarding" element= {<OnboardingPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
