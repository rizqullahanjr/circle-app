import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  chakra,
} from "@chakra-ui/react";
import Spinner from "../../../components/Spinner";
import { BiMessageAltDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import ThreadRepliesForm from "./ThreadRepliesForm";
import { useThreadReplies } from "../../../hooks/useThreadsReplies";

export default function ThreadReplies() {
  const navigate = useNavigate();
  const { threadReply, isLoading } = useThreadReplies();

  if (isLoading) return <Spinner />;

  const options = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  };
  let formattedDate;

  if (threadReply.created_at) {
    const unformattedDate = new Date(threadReply.created_at);
    formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      unformattedDate
    );
  }

  return (
    <Box>
      <Box color={"gray.100"}>
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <Heading size="xl" pb={8}>
            Thread Replies
          </Heading>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </Box>
        <HStack>
          <Box>
            <HStack>
              <Avatar
                name="avatar"
                src={threadReply.user_id.profile_picture}
                size="sm"
                mr="3"
                _hover={{
                  cursor: "pointer",
                }}
              />
              <Box>
                <Text
                  fontWeight="semibold"
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  {threadReply.user_id.full_name}
                </Text>
              </Box>
              <Text color="gray.600">&bull;</Text>
              <Box>
                <chakra.time fontSize="2xs" color="gray.400">
                  {formattedDate}
                </chakra.time>
              </Box>
            </HStack>
            <Box ms="3rem">
              {threadReply.image && (
                <Box mt="0.5rem">
                  <Image
                    boxSize="300px"
                    objectFit="cover"
                    src={threadReply.image}
                    alt="Dan Abramov"
                    rounded="md"
                  />
                </Box>
              )}

              <Box my="2">
                <Text fontSize="0.86rem">{threadReply.content}</Text>
              </Box>
              <Box>
                <HStack fontSize="xs">
                  <HStack>
                    <BsHeart />
                    <Text>10</Text>
                  </HStack>

                  <HStack>
                    <BiMessageAltDetail />
                    <Text>{threadReply.replies.length} Replies</Text>
                  </HStack>
                </HStack>
              </Box>
            </Box>
          </Box>
        </HStack>

        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="gray.800" px="4">
            Replies
          </AbsoluteCenter>
        </Box>
      </Box>
      <ThreadRepliesForm threadReply={threadReply}/>
    </Box>
  );
}
