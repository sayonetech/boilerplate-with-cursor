import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

type LoginFormData = {
  username: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

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
        description: 'Invalid username or password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="8xl" py={8} px={4}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 8, lg: 16 }} align="center">
          {/* Left side - Image */}
          <Box 
            flex="1"
            maxW={{ base: 'full', lg: '50%' }}
            display={{ base: 'none', md: 'block' }}
            position="relative"
            overflow="hidden"
            borderRadius="xl"
            bg="brand.500"
            h={{ base: '300px', lg: '600px' }}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
              opacity={0.9}
            />
            <Image
              src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Login illustration"
              objectFit="cover"
              w="100%"
              h="100%"
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
              <Heading size="xl" mb={4}>Welcome Back</Heading>
              <Text fontSize="lg">Sign in to continue managing your projects.</Text>
            </Box>
          </Box>

          {/* Right side - Login Form */}
          <Box 
            flex="1"
            w="full"
            maxW={{ base: 'md', lg: '500px' }}
            mx="auto"
            px={{ base: 4, lg: 8 }}
            py={6}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="xl"
            boxShadow="lg"
          >
            <Stack spacing={8}>
              <Stack spacing={2} align="center">
                <Heading size="2xl" color="brand.500">Welcome back</Heading>
                <Text color="gray.600">
                  Don't have an account?{' '}
                  <Link as={RouterLink} to="/register" color="brand.500" fontWeight="semibold">
                    Sign up
                  </Link>
                </Text>
              </Stack>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={6}>
                  <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      {...register('username')}
                      size="lg"
                      placeholder="Enter your username"
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.username?.message}
                    </Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        size="lg"
                        placeholder="Enter your password"
                        _focus={{ borderColor: 'brand.500' }}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          icon={showPassword ? <FiEyeOff /> : <FiEye />}
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          size="lg"
                          color="brand.500"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.password?.message}
                    </Text>
                  </FormControl>

                  <Button
                    type="submit"
                    size="lg"
                    variant="solid"
                    isLoading={isSubmitting}
                    w="full"
                    mt={6}
                    py={6}
                    fontSize="md"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    _active={{
                      transform: 'translateY(0)',
                      boxShadow: 'md',
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
} 