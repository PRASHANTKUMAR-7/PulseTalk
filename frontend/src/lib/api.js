import { axiosInstance } from "./axios";

 export const signup=async(signupData)=>{
    const response=await axiosInstance.post("/auth/signup", signupData);
    return response.data;
    };

 export const login=async(loginData)=>{
    const response=await axiosInstance.post("/auth/login", loginData);
    return response.data;
    };

  export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
   
// trycatch is used because if we log out then the authUser become false due to return null here and we redirect to login page after logout
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

// api for saving extra data of users 
export const completeOnboarding=async(userData)=>{
  const response=await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

// api for friends list
export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};

// api for recommended friends list
export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
};

// api for took care of sending friend-request or not
export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
};