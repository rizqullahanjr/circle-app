import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosApi from "../config/axiosApi";

export function useThreadReplies() {
  const { id } = useParams();
  const {
    data: threadReply,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["thread-reply", id],
    queryFn: async () => {
      const { data } = await axiosApi.get(`/thread/${id}`);
      return data;
    },
  });

  return {threadReply, isLoading, error};
}
