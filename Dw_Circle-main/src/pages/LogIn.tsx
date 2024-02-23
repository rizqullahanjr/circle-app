import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Link,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { handleChange, handleLogin } = useLogin();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      h="100dvh"
      alignItems="center"
      justifyContent="center"
      bg={"gray.800"}
      color={"gray.100"}
    >
      <Flex
        flexDirection="column"
        bg={"gray.700"}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>
          Log In to{" "}
          <Text as={"span"} color={"green.400"}>
            Circle
          </Text>
        </Heading>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="yourmail@gmail.com"
          type="email"
          name="email"
          mb={3}
          onChange={handleChange}
        />
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button colorScheme="teal" my={8} onClick={handleLogin}>
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Don't have an account?
            <Link
              color={"blue.400"}
              as={"span"}
              onClick={() => navigate("/auth/signup")}
            >
              {" "}
              Sign Up
            </Link>
          </FormLabel>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Login;
