import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";


const NotificationPage = () => {
  const queryClient = useQueryClient();

  const {data:friendRequests,isLoading}=useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })
  return (
    <div>
      Notification Page
    </div>
  )
}

export default NotificationPage
