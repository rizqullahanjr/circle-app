import { Heading } from "@chakra-ui/react";
import SearchUser from "../features/search/SearchUser";

export default function Search() {
  return (
    <>
      <Heading color={"gray.100"} size="xl" pb={8}>
        Search
      </Heading>
      <SearchUser />
    </>
  );
}
