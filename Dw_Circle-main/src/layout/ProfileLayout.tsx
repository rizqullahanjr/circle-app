import Sidebar from "../components/Sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <Box>
      <Grid templateColumns="0.6fr 3fr" height={"100vh"}>
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
      </Grid>
    </Box>
  )
}
