
import {
  Heading,
} from "@chakra-ui/react";
import ThreadPosts from "../features/threads/ThreadPosts";

export default function Thread() {
  return (
    <>
      <Heading color={"gray.100"} size="xl" pb={8}>
        Home
      </Heading>
      <ThreadPosts />
    </>
  );
}