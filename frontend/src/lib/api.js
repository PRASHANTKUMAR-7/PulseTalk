import { axiosInstance } from "./axios";

export const sighup= async(signupData)=>{
    const response=await axiosInstance.post("/auth/signup", signupData);
    return response.data;
    };