import { Navigate, Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SighUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
// import CallPage from "./pages/CallPage.jsx";
// import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import {Toaster} from "react-hot-toast";
import  PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';


const App = () => {
  // const time_to_start=3.10.00;
  //axios for frontend and backend relation
  //react querry or tanstack querry from custome hook useAuthUser
   const {isLoading,authUser}=useAuthUser();//we use user b/c in auth.route we use user
   const {theme}=useThemeStore(); //to change theme
   const isAuthenticated = Boolean(authUser);
   const isOnboarded = authUser?.isOnboarded

  if(isLoading) return <PageLoader/>;


  return (
     <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebarporps={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/notification"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebarporps={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        {/* <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        /> */}

        {/* <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebarporps={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        /> */}

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;