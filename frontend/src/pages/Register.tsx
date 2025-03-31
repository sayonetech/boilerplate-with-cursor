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
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password2: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
});

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
};

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again with different credentials',
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
              alt="Register illustration"
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
              <Heading size="xl" mb={4}>Join Our Platform</Heading>
              <Text fontSize="lg">Create your account and start managing your projects today.</Text>
            </Box>
          </Box>

          {/* Right side - Register Form */}
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
                <Heading size="2xl" color="brand.500">Create an account</Heading>
                <Text color="gray.600">
                  Already have an account?{' '}
                  <Link as={RouterLink} to="/login" color="brand.500" fontWeight="semibold">
                    Sign in
                  </Link>
                </Text>
              </Stack>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={6}>
                  <HStack spacing={4}>
                    <FormControl isInvalid={!!errors.first_name}>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        {...register('first_name')}
                        size="lg"
                        placeholder="Enter your first name"
                        _focus={{ borderColor: 'brand.500' }}
                      />
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.first_name?.message}
                      </Text>
                    </FormControl>

                    <FormControl isInvalid={!!errors.last_name}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        {...register('last_name')}
                        size="lg"
                        placeholder="Enter your last name"
                        _focus={{ borderColor: 'brand.500' }}
                      />
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.last_name?.message}
                      </Text>
                    </FormControl>
                  </HStack>

                  <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      {...register('username')}
                      size="lg"
                      placeholder="Choose a username"
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.username?.message}
                    </Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...register('email')}
                      type="email"
                      size="lg"
                      placeholder="Enter your email"
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.email?.message}
                    </Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        size="lg"
                        placeholder="Create a password"
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

                  <FormControl isInvalid={!!errors.password2}>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...register('password2')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        size="lg"
                        placeholder="Confirm your password"
                        _focus={{ borderColor: 'brand.500' }}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          variant="ghost"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          size="lg"
                          color="brand.500"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.password2?.message}
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
                    Create account
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