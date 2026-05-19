import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUnreadNotificationCount, markNotificationsAsRead } from "../lib/api";

export function useUnreadCount() {
  return useQuery({
    queryKey: ["unreadNotificationCount"],
    queryFn: getUnreadNotificationCount,
    refetchInterval: 10000, // polls every 10 seconds
    staleTime: 5000,
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      // reset badge to 0 immediately without waiting for next poll
      queryClient.setQueryData(["unreadNotificationCount"], { count: 0 });
    },
  });
}