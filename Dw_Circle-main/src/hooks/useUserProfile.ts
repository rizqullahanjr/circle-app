import { useQuery } from "@tanstack/react-query";
import axiosApi from "../config/axiosApi";

export function useUserProfile() {
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await axiosApi.get("/user");
      return data;
    },

  });

  return { profileData, isLoading, error };
}