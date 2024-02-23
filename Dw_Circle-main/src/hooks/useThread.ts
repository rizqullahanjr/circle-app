import { useQuery } from "@tanstack/react-query";
import axiosApi from "../config/axiosApi";

export function useThreads() {
  const {
    data: threadData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["thread-posts"],
    queryFn: async () => {
      const { data } = await axiosApi.get("/threads");
      return data;
    },

  });

  return { threadData, isLoading, error };
}
