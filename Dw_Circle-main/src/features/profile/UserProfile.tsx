import { Box, Grid, GridItem } from "@chakra-ui/react";
import UpdateUserProfileForm from "../../components/UpdateUserProfileForm";
import UserThreads from "./UserThreads";
import { useUserProfile } from "../../hooks/useUserProfile";
import Spinner from "../../components/Spinner";

export default function UserProfile() {
  const { profileData, isLoading } = useUserProfile();

  if (isLoading) return <Spinner />;
  const { threads } = profileData;
  return (
    <Box>
      <Grid templateColumns="0.6fr 3fr" height={"69vh"}>
        <GridItem
          as="aside"
          //   colSpan={2}
          bg="gray.800"
          borderRight="1px"
          px="1rem"
          borderColor="gray.700"
        >
          <UpdateUserProfileForm
            profilePic={profileData.profile_picture}
            username={profileData.username}
            full_name={profileData.full_name}
            bio={profileData.profile_description}
          />
        </GridItem>
        <GridItem
          as="main"
          borderColor="gray.700"
          //   colSpan={4}
          bg="gray.800"
          px="1rem"
          overflowY="auto"
        >
          <Box>
            {threads?.map((thread: any) => (
              <UserThreads
                key={thread.id}
                id={thread.id}
                content={thread.content}
                date={thread.created_at}
                image={thread.image}
              />
            ))}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
