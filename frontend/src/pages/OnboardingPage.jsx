import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";

const OnboardingPage = () => {
  const {authUser}=useAuthUser();

  const [formState, setFormState] = useState({
  fullName: authUser?.fullName || "",
  bio: authUser?.bio || "",
  nativeLanguage: authUser?.nativeLanguage || "",
  learningLanguage: authUser?.learningLanguage || "",
  location: authUser?.location || "",
  profilePic: authUser?.profilePic || ""
});

  return (
    <div>
      Onboarding Page
    </div>
  )
}

export default OnboardingPage
