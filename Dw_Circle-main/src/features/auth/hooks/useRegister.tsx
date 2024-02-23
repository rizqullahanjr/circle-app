import { ChangeEvent, useState } from "react";
import { IUserRegister } from "../../../types/UserProps";
import axiosApi from "../../../config/axiosApi";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [form, setForm] = useState<IUserRegister>({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axiosApi.post("/auth/register", form);
      console.log(response);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }

  return { form, handleChange, handleRegister };
}
