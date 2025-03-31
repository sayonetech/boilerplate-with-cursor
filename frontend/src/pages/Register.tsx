import React, { useState } from 'react';
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

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  password2: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
});

type RegisterFormData = yup.InferType<typeof schema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An error occurred',
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
            alt="Register illustration"
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
            <Heading size="xl" mb={4}>Join Our Platform</Heading>
            <Text fontSize="lg">Create your account and start managing your projects today.</Text>
          </Box>
        </Box>

        {/* Right side - Register Form */}
        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <Box w="full" maxW="md" p={8}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="xl" mb={2}>Create an account</Heading>
                <Text color="gray.600">Please fill in your details to sign up</Text>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6}>
                  <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Choose a username"
                      {...register('username')}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>{errors.username?.message}</Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="lg"
                      type="email"
                      placeholder="Enter your email"
                      {...register('email')}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>{errors.email?.message}</Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.first_name}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Enter your first name"
                      {...register('first_name')}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>{errors.first_name?.message}</Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.last_name}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Enter your last name"
                      {...register('last_name')}
                    />
                    <Text color="red.500" fontSize="sm" mt={1}>{errors.last_name?.message}</Text>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="lg">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
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

                  <FormControl isInvalid={!!errors.password2}>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size="lg">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        {...register('password2')}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          variant="ghost"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Text color="red.500" fontSize="sm" mt={1}>{errors.password2?.message}</Text>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    isLoading={isSubmitting}
                  >
                    Sign up
                  </Button>
                </VStack>
              </form>

              <HStack justify="center" spacing={1}>
                <Text>Already have an account?</Text>
                <Link color="blue.500" href="/login" fontWeight="semibold">
                  Sign in
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </HStack>
    </Container>
  );
} 