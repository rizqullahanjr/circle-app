import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import { Box, Button, Image, Input } from "@chakra-ui/react";
import { useUpdateProfile } from "../features/profile/hooks/useUpdateProfile";

export default function UpdateUserProfileForm({
  profilePic,
  username,
  full_name,
  bio,
}: any) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { form, setForm, updateUser, isUpdating } = useUpdateProfile();

  function onSubmit({ full_name, username, profile_description }: any) {
    setForm({ ...form, full_name, username, profile_description });
    updateUser();
  }

  return (
    <Box
      w="400px"
      display={"flex"}
      flexDirection="column"
      bgColor="gray.700"
      rounded="xl"
      px="5"
      py="9"
    >
      <Box display="flex" justifyContent="center">
        <Image
          h="140px"
          w="auto"
          objectFit="cover"
          rounded="full"
          src={profilePic}
          border="4px"
          borderColor="green.400"
        />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Fullname"
          error={errors?.full_name?.message?.toString()}
        >
          <Input
            defaultValue={full_name}
            type="text"
            isDisabled={isUpdating}
            id="full_name"
            {...register("full_name", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Username" error={errors?.username?.message?.toString()}>
          <Input
            defaultValue={username}
            type="text"
            id="username"
            isDisabled={isUpdating}
            {...register("username", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow
          label="Profile description"
          error={errors?.profile_description?.message?.toString()}
        >
          <Input
            defaultValue={bio}
            type="text"
            id="profile_description"
            isDisabled={isUpdating}
            {...register("profile_description", {
              required: "This field is required",
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
