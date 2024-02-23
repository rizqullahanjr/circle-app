import { useQuery } from "@tanstack/react-query";
import axiosApi from "../../config/axiosApi";

export function useFollowing() {
  const {
    data: userFollowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["following"],
    queryFn: async () => {
      const { data } = await axiosApi.get("/user");
      return data;
    },
  });

  return { userFollowData, isLoading, error };
}
