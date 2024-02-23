import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import ThreadItems from "./ThreadItems";
import { ThreadPostsProps } from "../../types/ThreadItemsProps";
import Spinner from "../../components/Spinner";
import { useThreads } from "../../hooks/useThread";
import { useCreateThread } from "../../hooks/useCreateThread";
import { useFollowing } from "../Follows/useFollowing";

export default function ThreadPosts() {
  const { threadData, isLoading } = useThreads();
  const {
    handleChange,
    mutate,
    isPending,
    handleButtonClick,
    fileInputRef,
    form,
    file,
    setFile,
  } = useCreateThread();
  const { userFollowData: userProfileData } = useFollowing();

  if (isLoading) return <Spinner />;

  return (
    <Flex direction="column" color={"gray.100"}>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <FormControl>
          <HStack maxW={"6xl"} justifyContent={"center"} gap={5}>
            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src={userProfileData?.profile_picture}
            />
            <Input
              variant="flushed"
              placeholder="What's on your mind"
              maxW="25rem"
              name="content"
              onChange={handleChange}
              value={form.content}
            />
            <FormLabel htmlFor="image" pos="relative" mt="2">
              <IconButton
                aria-label="addImage"
                icon={<BiImageAdd />}
                onClick={handleButtonClick}
              />
              <Input
                ref={fileInputRef}
                onChange={handleChange}
                type="file"
                name="image"
                id="image"
                style={{
                  opacity: "0",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  cursor: "pointer",
                }}
              />
            </FormLabel>

            <Button
              colorScheme="green"
              type="submit"
              isLoading={isPending}
              onClick={() =>
                setTimeout(() => {
                  setFile(null);
                }, 1000)
              }
            >
              Post
            </Button>
          </HStack>
        </FormControl>
      </form>
      {file && (
        <Box display="flex" justifyContent="center">
          <Image
            mt="20px"
            h="200px"
            w="auto"
            objectFit="cover"
            rounded="md"
            src={URL.createObjectURL(file)}
          />
          <Button variant="unstyled" onClick={() => setFile(null)}>
            x
          </Button>
        </Box>
      )}

      <Stack
        flex="1"
        py="5"
        divider={
          <StackDivider w="95%" alignSelf="center" borderColor="gray.600" />
        }
      >
        {threadData?.map((thread: ThreadPostsProps) =>
          thread.user_id ? (
            <Box key={thread.id} py="3">
              <ThreadItems
                id={thread.id}
                username={thread.user_id.full_name}
                userphoto={thread.user_id.profile_picture}
                content={thread.content}
                image={thread.image}
                date={thread.created_at}
                likes={thread.like}
                replies={thread.numOfReplies}
              />
            </Box>
          ) : null
        )}
      </Stack>
    </Flex>
  );
}
