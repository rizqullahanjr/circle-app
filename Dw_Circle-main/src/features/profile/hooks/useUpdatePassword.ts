import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosApi from "../../../config/axiosApi";
import useToast from "../../../hooks/useToast";

export function useUpdatePassword() {
  const [form, setForm] = useState({
    password: "",
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      return await axiosApi.patch("/userpw", form);
    },
    onSuccess: () => {
      toast("Success", "Update password success", "success");
      queryClient.invalidateQueries({ queryKey: ["following"] });
      setForm({
        password: "",
      })
    },
    onError: (err) => {
      console.log(err);
      toast("Error", err.message, "error");
    },
  });

  return { form, setForm, updateUser, isUpdating };
}
