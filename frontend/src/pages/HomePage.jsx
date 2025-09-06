
// ***********************************************************
import {useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRecommendedUsers,getUserFriends,getOutgoingFriendReqs,sendFriendrequest} from "../lib/api";
import { Link} from "react-router";
import { UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard.jsx"
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const HomePage = () => {
  const queryClient=useQueryClient();

  const[outgoingRequestIds, setOutgoingRequestsIds]=useState(new Set());
  const{data:friends=[], isLoading:loadingFriends}=useQuery({
    queryKey:["friends"],
    queryFn:getUserFriends
  });

  const{data:recommendedUsers={}, isLoading:loadingUsers}=useQuery({
    queryKey:["users"],
    queryFn:getRecommendedUsers
  });

  const{data:outgoingFriendReqs}=useQuery({
    queryKey:["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // mutation to send friends request
  const { mutate:sendRequestMutation,isPending}=useMutation({
    mutationFn: sendFriendrequest,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["outgoingFriendReqs"]}),
  });
//useEffectis responsible for processing a list of outgoing friend requests and storing their unique IDs in a state variable
  useEffect(() => {
  const outgoingIds = new Set()
  if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
    outgoingFriendReqs.forEach((req) => {
      outgoingIds.add(req.id)
    })
    setOutgoingRequestsIds(outgoingIds)
  }
}, [outgoingFriendReqs]);

  return (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="container mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
        <Link to="/notifications" className="btn btn-outline btn-sm">
          <UsersIcon className="mr-2 size-4" />
          Friend Requests
        </Link>
      </div>
      {loadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
      <section>
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
              <p className="opacity-70">
                Discover perfect language exchange partners based on your profile
              </p>
            </div>
          </div>
        </div>
      </section> 
    </div>
</div>
  )
}

export default HomePage
