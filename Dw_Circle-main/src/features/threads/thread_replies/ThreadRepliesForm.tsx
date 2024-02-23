import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { ReplyInterface } from "../../../types/RepliesItemsProps";
import { useCreateReply } from "../../../hooks/useCreateReply";
import { BiImageAdd } from "react-icons/bi";
import { ChatIcon } from "@chakra-ui/icons";

interface ThreadRepliesFormProps {
  threadReply: {
    replies: ReplyInterface[];
  };
}

export default function ThreadRepliesForm({
  threadReply,
}: ThreadRepliesFormProps) {
  const {
    handleChange,
    mutate,
    isPending,
    handleButtonClick,
    fileInputRef,
    file,
    setFile,
  } = useCreateReply();

  return (
    <Box color={"gray.100"}>
      <Stack
        borderRadius="xl"
        bgColor="gray.700"
        maxW="80%"
        mx="auto"
        flex="1"
        py="5"
        divider={
          <StackDivider w="85%" alignSelf="center" borderColor="gray.500" />
        }
      >
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <FormControl>
            <HStack
              maxW={"sm"}
              mx="auto"
              justifyContent={"center"}
              alignItems="center"
              gap={1}
            >
              <Input
                placeholder="Reply to this thread"
                maxW="25rem"
                name="content"
                onChange={handleChange}
              />
              <FormLabel htmlFor="image" pos="relative" mt={2}>
                <IconButton
                  aria-label="addImage"
                  icon={<BiImageAdd />}
                  onClick={handleButtonClick}
                />
                <Input
                  ref={fileInputRef}
                  onChange={handleChange}
                  type="file"
                  name="image"
                  id="image"
                  style={{
                    opacity: "0",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "pointer",
                  }}
                />
              </FormLabel>
              <Button
                colorScheme="green"
                type="submit"
                isLoading={isPending}
                leftIcon={<ChatIcon />}
                px={7}
              >
                Reply
              </Button>
            </HStack>
          </FormControl>
        </form>
        {file && (
          <Box display="flex" justifyContent="center">
            <Image
              mt="20px"
              h="140px"
              w="auto"
              objectFit="cover"
              rounded="md"
              src={URL.createObjectURL(file)}
            />
            <Button variant="unstyled" onClick={() => setFile(null)}>
              x
            </Button>
          </Box>
        )}

        {threadReply.replies.map((reply: ReplyInterface) => (
          <Box key={reply.id} px="12" pt="3">
            <Box display="flex" gap="8px">
              <Avatar
                name="avatar"
                src={reply.user_id.profile_picture}
                size="sm"
                mr="3"
                _hover={{
                  cursor: "pointer",
                }}
              />
              <Text fontWeight="semibold" fontSize="lg">
                {reply.user_id.full_name}
              </Text>
            </Box>
            <Box px={12} py={3}>
              {reply.image && (
                <Image
                  src={reply.image}
                  boxSize="200px"
                  objectFit="cover"
                  alt="Dan Abramov"
                  rounded="md"
                  mb={3}
                />
              )}
              <Text fontSize="sm">{reply.content}</Text>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
