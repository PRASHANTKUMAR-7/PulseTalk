import {useQuery} from "@tanstack/react-query";
import { axiosInstance } from '../lib/axios.js';

const useAuthUser = () => {
  //react querry or tanstack querry
  const authUser = useQuery({//this has a great feature that if it(useQuery/teanstack) fails then it try more then once to execute on the other hand usestate will try single time
    queryKey: ["authUser"], //used in signup page
    queryFn: async()=>{
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false, //if you dont want to retry more than once
  });
  return {isLoading: authUser.isLoading, authUser: authUser.data?.user};
}

export default useAuthUser
