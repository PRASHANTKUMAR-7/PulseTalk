// This file is created to avoid using multiple time using of the same below code for each api fetch from backend on App.jsx page so to avoid this we can do those things here. 

// //axios for frontend and backend relation
//   //react querry or tanstack querry
//   const {data,isLoading,error} = useQuery({
//     queryKey: ["todo"],

//     queryFn: async()=>{
//       const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
//       return res.data;
//     }
//   });
//****************************************************************************************

import axios from "axios";

export const axiosInstance =axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials: true, //send cookies with the request for authentication 
});