import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const useGoogleOAuthEnabled = () =>
  useQuery({
    queryKey: ["googleOAuthEnabled"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/oauth/status");
      return res.data.googleOAuthEnabled;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });