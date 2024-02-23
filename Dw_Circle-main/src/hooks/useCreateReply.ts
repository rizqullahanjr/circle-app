import { ChangeEvent, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "../config/axiosApi";
import useToast from "./useToast";
import { useParams } from "react-router-dom";
import { UseCreateReplyProps } from "../types/RepliesItemsProps";

export function useCreateReply() {
  const { id } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<UseCreateReplyProps>({
    content: "",
    image: "",
    thread_id: Number(id),
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
    fileInputRef.current?.click();
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const formData = new FormData();

      formData.append("content", form.content);
      formData.append("image", file as File);
      formData.append("thread_id", form.thread_id.toString());

      return axiosApi.post("/replies", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thread-reply", id] });
      toast("Success", "Reply posted successfully", "success");
      setForm({
        content: "",
        image: "",
        thread_id: Number(id),
      });
    },
    onError: (err) => {
      console.log(err);
      toast("Error", err.message, "warning");
    },
  });

  return {
    form,
    handleChange,
    mutate,
    isPending,
    handleButtonClick,
    fileInputRef,
    file,
    setFile,
  };
}
