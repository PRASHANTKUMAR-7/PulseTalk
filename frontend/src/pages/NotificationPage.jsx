import { useMutation,useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";


const NotificationPage = () => {
  const queryClient = useQueryClient();

  const {data:friendRequests,isLoading}=useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
//if friend request accepted then immediately show in frined list
  const {mutate: acceptRequestMutation, isPending}=useMutation({
    mutationFn:acceptFriendRequest,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["friendRequests"]});
      queryClient.invalidateQueries({queryKey:["friends"]})
    }
  })



  return (
    <div>
      Notification Page
    </div>
  )
}

export default NotificationPage
