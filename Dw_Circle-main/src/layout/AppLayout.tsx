import Sidebar from "../components/Sidebar";
import Profile from "../features/profile/profileSidebar/ProfileSidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <Box>
      <Grid templateColumns="0.6fr 2fr 1fr" height={"100vh"}>
        <GridItem
          as="aside"
          //   colSpan={2}
          bg="gray.800"
          borderRight="1px"
          borderColor="gray.700"
          p="2rem"
        >
          <Sidebar />
        </GridItem>
        <GridItem
          as="main"
          borderRight="1px"
          borderColor="gray.700"
          //   colSpan={4}
          bg="gray.800"
          p="2rem"
          overflowY="auto"
        >
          <Outlet />
        </GridItem>
        <GridItem
          as="div"
          bg="gray.800"
          //   colSpan={2}
          minHeight="100vh"
          p="2rem"
        >
          <Profile />
        </GridItem>
      </Grid>
    </Box>
  )
}
