import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";

const OnboardingPage = () => {
  const {authUser}=useAuthUser();
  const querryClient=useQueryClient();

  const [formState, setFormState] = useState({
  fullName: authUser?.fullName || "",
  bio: authUser?.bio || "",
  nativeLanguage: authUser?.nativeLanguage || "",
  learningLanguage: authUser?.learningLanguage || "",
  location: authUser?.location || "",
  profilePic: authUser?.profilePic || ""
});
const {mutate:onboardingMutation, isPending}= useMutation({
  mutationFn:completeOnboarding,
  onSuccess:()=>{
    toast.success("Profile Onboarded Successfully");
    querryClient.invalidateQueries({queryKey: ["authUser"]});
  },
});
const handleSubmit=(e)=>{
  e.preventDefaullt();

  onboardingMutation(formState);
}

  return (
  <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
    <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
      <div className="card-body p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* profile pic container */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Image Preview */}
            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"/>
                  ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                </div>
                )
              }
            </div>
          </div>

        </form>
      </div>
    </div>
</div>

  )
}

export default OnboardingPage
