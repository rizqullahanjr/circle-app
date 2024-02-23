import { Avatar, Box, HStack, Image, Text, chakra } from "@chakra-ui/react";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { ThreadItemsProps } from "../../types/ThreadItemsProps";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "../../config/axiosApi";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";
import { RootState } from "../../store/type/RootState";

export default function ThreadItems({
  id,
  username,
  userphoto,
  content,
  image,
  date,
  likes,
  replies,
}: ThreadItemsProps) {
  const [likeId, setLikeId] = useState({
    threads_id: id,
  });
  const userId = useSelector((state: RootState) => state?.auth);

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: handleLike } = useMutation({
    mutationFn: () => {
      return axiosApi.post(`likes`, likeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thread-posts"] });
    },
    onError: (err) => {
      console.log(err);

      toast("Error", err.message, "error");
    },
  });

  function handleClick() {
    setLikeId({ threads_id: id });
    handleLike();
  }

  const unformattedDate = new Date(date);

  const options = {
    month: "long" as const,
    day: "numeric" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    unformattedDate
  );

  return (
    <HStack>
      <Box px="1rem">
        <HStack>
          <Avatar
            src={userphoto}
            size="sm"
            mr="3"
            _hover={{
              cursor: "pointer",
            }}
          />

          <Box>
            <Text
              fontWeight="medium"
              _hover={{
                cursor: "pointer",
              }}
            >
              {username}
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
          {image && (
            <Box mt="0.5rem">
              <Image
                boxSize="300px"
                objectFit="cover"
                src={image}
                alt="Dan Abramov"
                rounded="md"
              />
            </Box>
          )}
          <Box my="2">
            <Text fontSize="0.86rem">{content}</Text>
          </Box>
          <Box>
            <HStack fontSize="xs">
              <HStack onClick={handleClick}>
                {likes.map((like) => like.user_id.id).includes(userId.id) ? (
                  <BsHeartFill />
                ) : (
                  <BsHeart />
                )}
                <Text>{likes.length}</Text>
              </HStack>
              <Link to={`/threads/${id}`}>
                <HStack>
                  <BiMessageAltDetail />
                  <Text>{replies} Replies</Text>
                </HStack>
              </Link>
            </HStack>
          </Box>
        </Box>
      </Box>
    </HStack>
  );
}
