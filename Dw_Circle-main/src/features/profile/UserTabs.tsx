import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
  } from "@chakra-ui/react";
import UserProfile from "./UserProfile";
import UserCredientials from "./UserCredientials";

export default function UserTabs() {
  return (
    <Box color="gray.100">
    <Tabs>
      <TabList>
        <Tab>User Profile</Tab>
        <Tab>User Credentials</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserProfile />
        </TabPanel>
        <TabPanel>
          <UserCredientials />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
  )
}
