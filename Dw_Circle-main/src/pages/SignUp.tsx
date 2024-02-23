import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Link,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '../features/auth/hooks/useRegister'
  
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {handleChange, handleRegister} = useRegister()
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgColor={"gray.800"}
        color={"gray.100"}
        >
        <Stack spacing={8} mx={'auto'} w={'md'} py={12} px={6} >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              <Text as={"span"} color={"green.400"}>Circle</Text> Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bgColor={"gray.700"}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            <FormControl id="full_name" isRequired>
                <FormLabel>Fullname</FormLabel>
                <Input type="text" name="full_name" onChange={handleChange}/>
              </FormControl>
            <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" name='username' onChange={handleChange}/>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' onChange={handleChange}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                onClick={handleRegister}
                  loadingText="Submitting"
                  size="lg"
                  bg={'green.500'}
                  color={'white'}
                  _hover={{
                    bg: 'green.600',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} onClick={() => navigate("/auth/login")}>
                  Already a user? <Link color={'green.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }