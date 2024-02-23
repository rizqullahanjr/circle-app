import { useQuery } from "@tanstack/react-query";
import axiosApi from "../config/axiosApi";

export default function useUsers() {
  const {
    data: userLists,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosApi.get("/users");
      return data;
    },
  });

  return { userLists, isLoading, error };
}
