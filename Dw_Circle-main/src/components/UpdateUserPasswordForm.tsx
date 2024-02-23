import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import { Box, Button, Input } from "@chakra-ui/react";
import { useUpdatePassword } from "../features/profile/hooks/useUpdatePassword";


export default function UpdateUserPasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { form, setForm, updateUser, isUpdating } = useUpdatePassword();

  function onSubmit({ password }: any) {
    setForm({ ...form, password });
    updateUser();
  }

  return (
    <Box w="540px" display={"flex"} flexDirection="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="New password (min 8 chars)"
          error={errors?.password?.message?.toString()}
        >
          <Input
            type="password"
            isDisabled={isUpdating}
            id="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </FormRow>
        <FormRow label="Confirm new password" error={errors?.passwordConfirm?.message?.toString()}>
          <Input
            type="password"
            id="passwordConfirm"
            isDisabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords do not match",
            })}
          />
        </FormRow>
        <Box
          mt="20px"
          display="flex"
          justifyContent="space-between"
          maxW="11rem"
        >
          <Button onClick={reset} type="reset">
            Cancel
          </Button>
          <Button type="submit" isLoading={isUpdating} colorScheme="green">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
