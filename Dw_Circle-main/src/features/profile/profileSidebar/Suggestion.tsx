import { Box, Card, Spinner, Text } from "@chakra-ui/react";
import useUsers from "../../../hooks/useUsers";
import SuggestionItems from "./SuggestionItems";
import { RootState } from "../../../store/type/RootState";
import { useSelector } from "react-redux";

// interface UserSuggest {
//   id: number;
//   username: string;
//   full_name: string;
// }

export default function Suggestion() {
  const { userLists, isLoading } = useUsers();
  const SignedInuser = useSelector((state: RootState) => state?.auth);

  const List = userLists?.filter((user: any) => user.id !== SignedInuser.id);

  if (isLoading) return <Spinner />;
  return (
    <Card bg="whiteAlpha.200" p={4} minW="380px">
      <Text color="white">Suggested for you</Text>

      <Box overflowY="auto" h="15rem">
        {List.map((user: any) => (
          <SuggestionItems
            user_id={user.id}
            username={user.username}
            fullname={user.full_name}
            key={user.id}
          />
        ))}
      </Box>
    </Card>
  );
}
