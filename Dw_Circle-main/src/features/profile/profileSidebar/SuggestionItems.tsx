import { Box, Button, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import useToast from "../../../hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "../../../config/axiosApi";
import { useFollowing } from "../../Follows/useFollowing";

export default function SuggestionItems({
  user_id,
  username,
  fullname,
}: any) {
  

  const [followId, setFollowId] = useState({
    followingId: user_id,
  });
  // const SignedInuser = useSelector((state: RootState) => state?.auth);
  const { userFollowData, isLoading } = useFollowing();

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return axiosApi.post(`follow`, followId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err) => {
      console.log(err);

      toast("Error", err.message, "error");
    },
  });

  function handleClick() {
    setFollowId({ followingId: user_id });
    handleFollow();
  }

  if (isLoading) return <Spinner />;

  const { following } = userFollowData;
  console.log(following);
  

  const isFollowing = following.some((follow: any) => follow.id === user_id);
  
  return (
    <HStack spacing={0} justifyContent={"space-between"} px={2} key={user_id}>
      <Box>
        <Flex flexDirection="column">
          <Text mt={3} fontSize="sm" fontWeight="semibold" color="white">
            {fullname}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.600">
            @{username}
          </Text>
        </Flex>
      </Box>
      <Box>
        {isFollowing ? (
          <Button
            onClick={handleClick}
            colorScheme="whiteAlpha"
            color="white"
            size="xs"
            rounded="full"
            variant="outline"
            mt={8}
            w="fit-content"
            opacity="70%"
          >
            Following
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            colorScheme="whiteAlpha"
            color="white"
            size="xs"
            rounded="full"
            variant="outline"
            mt={8}
            w="fit-content"
          >
            Follow
          </Button>
        )}
      </Box>
    </HStack>
  );
}
