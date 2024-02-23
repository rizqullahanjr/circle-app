import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosApi from "../../../config/axiosApi";
import useToast from "../../../hooks/useToast";

export function useUpdateProfile() {
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    profile_description: "",
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      return await axiosApi.patch("/userpw", form);
    },
    onSuccess: () => {
      toast("Success", "Update profile success", "success");
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
    onError: (err) => {
      console.log(err);
      toast("Error", err.message, "error");
    },
  });

  return { form, setForm, updateUser, isUpdating };
}
