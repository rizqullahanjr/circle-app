import { ChangeEvent, useRef, useState } from "react";
import { UseThreadProps } from "../types/ThreadItemsProps";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "../config/axiosApi";
import useToast from "./useToast";

export function useCreateThread() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<UseThreadProps>({
    content: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      console.log("masukfile" + files);
      
      setFile(files[0]);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleButtonClick() {
    fileInputRef.current?.click()
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()

      formData.append("content", form.content)
      formData.append("image", file as File);
      
      return await axiosApi.post("/thread", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thread-posts"] });
      toast("Success", "New Thread successfully posted 😀", "success");
      setForm({
        content: "",
        image: "",
      });
    },
    onError: (err) => {
      console.log(err);
      toast("Error", err.message, "warning");
    },
  });

  return { form, handleChange, mutate, isPending, fileInputRef, handleButtonClick, file, setFile };
}
