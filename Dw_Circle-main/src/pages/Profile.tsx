import { Heading } from "@chakra-ui/react";
import UserTabs from "../features/profile/UserTabs";


export default function Profile() {
  return (
    <>
      <Heading color={"gray.100"} size="xl" pb={8}>
        Profile
      </Heading>
      <UserTabs />
    </>
  );
}
