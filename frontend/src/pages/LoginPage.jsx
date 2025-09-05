import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquareHeart } from "lucide-react";
import { login } from "../lib/api";


const LoginPage = () => {
const[loginData , setLoginData]=useState({
  email: "",
  password:"",
});
const queryClient=useQueryClient();

const {
  mutate:loginMutation,
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
  <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
  <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
    {/* LOGIN FORM SECTION */}
    <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
      {/* LOGO */}
      <div className="mb-4 flex items-center justify-start gap-2">
        <MessageSquareHeart className="size-9 text-primary" />
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary -tracking-wider">
          Streamify
        </span>
      </div>
      {/* Error Message Display */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error.response.data.message}</span>
        </div>
      )}

      {/* Login Form */}
      <div className="w-full">
        <form onSubmit={handlelogin}>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold"> Welcome Back</h2>
              <p className="text-sn opacity-70">
                Log in and start your next chapter of conversations!
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="form-control w-full space-y-2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="input input-bordered w-full"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              {/* Password */}
              <div className="form-control w-full space-y-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="input input-bordered w-full"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                {
                  isPending?(
                    <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Logging in...
                    </>
                  ):(
                    "Log In"
                  )
                }
              </button>
              <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </div>
            </div>              
          </div>
        </form>
      </div>

    </div>
  </div>
</div>
  )
}

export default LoginPage
