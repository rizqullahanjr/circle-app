import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Spinner from "../../components/Spinner";
import { useFollowing } from "./useFollowing";

export default function Followers() {
  const { userFollowData, isLoading } = useFollowing();

  if (isLoading) return <Spinner />;

  const { followers } = userFollowData;

  return (
    <Box>
      <Card bgColor="gray.700" color="gray.100">
        <CardHeader>
          <Heading size="md">Your Followers: {followers?.length}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {followers?.map((follower: any) => (
              <Box key={follower.id}>
                <Flex gap="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar src={follower.profile_picture} size="sm" />
                    <Box>
                      <Heading size="sm">{follower.full_name}</Heading>
                    </Box>
                  </Flex>
                </Flex>
                <Heading size="xs"></Heading>
                <Text pt="2" fontSize="sm">
                  {follower.profile_description
                    ? follower.profile_description
                    : "Tidak ada deskripsi profil"}
                </Text>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
