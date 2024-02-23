import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import useUsers from "../../hooks/useUsers";
import { useState } from "react";

interface UserSearch {
  id: number;
  username: string;
  full_name: string;
  profile_picture: string;
}

export default function SearchUser() {
  const { userLists, isLoading } = useUsers();
  const [filtered, setFiltered] = useState<string>("");

  if (isLoading) return <Spinner />;

  const results =
    filtered.length > 0
      ? userLists.filter((user: UserSearch) =>
          `${user.username} ${user.full_name}`
            .toLowerCase()
            .includes(filtered.toLowerCase())
        )
      : null;

  return (
    <Box color="gray.100">
      <Stack>
        <InputGroup size="sm">
          <Input
            rounded="xl"
            placeholder="Search user..."
            value={filtered}
            onChange={(e) => {
              setFiltered(e.target.value);
            }}
          />
          <InputRightAddon
            children="Username or Fullname"
            bgColor="gray.700"
            rounded="xl"
          />
        </InputGroup>
      </Stack>

      <Box maxW="lg" mx="auto" py="2rem">
        {results ? (
          results.map((user: UserSearch) => (
            <Box key={user.id}>
              <Flex gap="4" py="1rem">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar src={user.profile_picture} size="sm" />
                  <Box>
                    <Heading size="sm">{user.full_name}</Heading>
                    <Text fontSize="xs" color="whiteAlpha.600">
                      @{user.username}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Divider variant="dashed" colorScheme="green" />
            </Box>
          ))
          ) : (
          <Box display="flex" minH="sm" alignItems="center" justifyContent="center">
            <Text textAlign="center">Start searching a user 😉</Text>
          </Box>
        )}
      {results?.length === 0 && (
        <Box display="flex" minH="sm" alignItems="center" justifyContent="center">
        <Text textAlign="center">User Not Found 😭</Text>
      </Box>
      )}
      </Box>
    </Box>
  );
}
