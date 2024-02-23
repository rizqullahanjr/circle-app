import { Box, HStack, Image, Text, chakra } from "@chakra-ui/react";
import { BiMessageAltDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function UserThreads({ id, content, date, image }: any) {
  return (
    <HStack>
      <Box px="1rem">
        <Box>
          <chakra.time fontSize="2xs" color="gray.400">
            {date}
          </chakra.time>
        </Box>
        <Box ms="3rem">
          {image && (
            <Box mt="0.5rem">
              <Image
                boxSize="300px"
                objectFit="cover"
                src={image}
                alt="Dan Abramov"
                rounded="md"
              />
            </Box>
          )}
          <Box my="2">
            <Text fontSize="0.86rem">{content}</Text>
          </Box>
          <Box>
            <HStack fontSize="xs">
              <Link to={`/threads/${id}`}>
                <HStack>
                  <BiMessageAltDetail />
                  <Text>68 Replies</Text>
                </HStack>
              </Link>
            </HStack>
          </Box>
        </Box>
      </Box>
    </HStack>
  );
}
