import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";


const LoginPage = () => {
cosnt[loginData , setLoginData]=useState({
  email: "",
  password:"",
});
 const queryClient=useQueryClient();

const {
  mutate: loginMutation,
  isPending,
  error,
 }=useMutation({
  mutationFn:login,
  onSuccess: ()=>queryClient.invalidateQueries({queryKey:["authUser"] }), 
});

const handlelogin=(e)=>{
  e.preventDefault();
  loginMutation(loginData);
};


  return (
    <div>
      Login Page
    </div>
  )
}

export default LoginPage
