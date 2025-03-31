import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  Container,
  Image,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <HStack spacing={20} align="stretch">
        {/* Left side - Image */}
        <Box 
          flex={1} 
          display={{ base: 'none', md: 'block' }}
          position="relative"
          overflow="hidden"
          borderRadius="xl"
          bg="blue.500"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="linear-gradient(135deg, #3182CE 0%, #2B6CB0 100%)"
            opacity={0.9}
          />
          <Image
            src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Login illustration"
            objectFit="cover"
            h="600px"
            w="100%"
            position="relative"
            zIndex={1}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={8}
            color="white"
            zIndex={2}
          >
            <Heading size="xl" mb={4}>Welcome to Our Platform</Heading>
            <Text fontSize="lg">Manage your projects and tasks efficiently with our powerful dashboard.</Text>
          </Box>
        </Box>

        {/* Right side - Login Form */}
        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <Box w="full" maxW="md" p={8}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="xl" mb={2}>Welcome back</Heading>
                <Text color="gray.600">Please enter your details to sign in</Text>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6}>
                  <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Enter your username"
                      {...register('username')}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>{errors.username?.message}</Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="lg">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        {...register('password')}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          icon={showPassword ? <FiEyeOff /> : <FiEye />}
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Text color="red.500" fontSize="sm" mt={1}>{errors.password?.message}</Text>
                  </FormControl>

                  <HStack justify="space-between" w="full">
                    <Text color="blue.500" cursor="pointer">Forgot password?</Text>
                  </HStack>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    isLoading={isSubmitting}
                  >
                    Sign in
                  </Button>
                </VStack>
              </form>

              <HStack justify="center" spacing={1}>
                <Text>Don't have an account?</Text>
                <Link color="blue.500" href="/register" fontWeight="semibold">
                  Sign up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </HStack>
    </Container>
  );
} 