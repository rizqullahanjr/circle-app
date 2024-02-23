import { Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import { BiLogoFacebook, BiLogoGithub, BiLogoInstagramAlt, BiLogoYoutube } from "react-icons/bi";


export default function DevelopedBy() {
  return (
    <Card
    as={Flex}
    basis="10%"
    direction="column"
    gap={1}
    p={3}
    bg="gray.700"
    color="white"
  >
    <Flex gap={4} flexDirection={"column"}>
      <Text fontSize={"sm"}>
        Developed by{" "}
        <Text as="span" fontWeight={600}>
          Rizqullah Anjar Pradana
        </Text>
      </Text>
      <Box as={Flex} gap={1}>
        <BiLogoGithub />
        <BiLogoFacebook />
        <BiLogoInstagramAlt />
        <BiLogoYoutube />
      </Box>
    </Flex>
    <Flex gap={2} align="center" color="whiteAlpha.600">
      <Text fontSize="xs">Powered by</Text>
      <Image display="inline" h="16px" src="/dumbways.png" />
      <Text fontSize="xs">Dumbways Indonesia</Text>
    </Flex>
  </Card>
  )
}
