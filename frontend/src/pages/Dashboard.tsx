import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Container,
  HStack,
  Icon,
  VStack,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { FiUsers, FiFolder, FiCheckSquare, FiLogOut, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/login');
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Header */}
      <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} py={4}>
        <Container maxW="container.xl">
          <HStack justify="space-between">
            <Heading size="md">Dashboard</Heading>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                leftIcon={<Avatar size="sm" name={user?.first_name} />}
              >
                {user?.first_name} {user?.last_name}
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FiUser />}>Profile</MenuItem>
                <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
          <GridItem>
            <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="sm">
              <Stat>
                <StatLabel>Total Users</StatLabel>
                <StatNumber>1,234</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12%
                </StatHelpText>
              </Stat>
            </Box>
          </GridItem>

          <GridItem>
            <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="sm">
              <Stat>
                <StatLabel>Active Projects</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  8%
                </StatHelpText>
              </Stat>
            </Box>
          </GridItem>

          <GridItem>
            <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="sm">
              <Stat>
                <StatLabel>Tasks Completed</StatLabel>
                <StatNumber>789</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  15%
                </StatHelpText>
              </Stat>
            </Box>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="sm">
              <Heading size="md" mb={4}>Recent Activity</Heading>
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Icon as={FiUsers} boxSize={5} color="blue.500" />
                  <Box>
                    <Text fontWeight="medium">New user registration</Text>
                    <Text fontSize="sm" color="gray.500">2 minutes ago</Text>
                  </Box>
                </HStack>
                <Divider />
                <HStack spacing={4}>
                  <Icon as={FiFolder} boxSize={5} color="green.500" />
                  <Box>
                    <Text fontWeight="medium">Project created</Text>
                    <Text fontSize="sm" color="gray.500">1 hour ago</Text>
                  </Box>
                </HStack>
                <Divider />
                <HStack spacing={4}>
                  <Icon as={FiCheckSquare} boxSize={5} color="purple.500" />
                  <Box>
                    <Text fontWeight="medium">Task completed</Text>
                    <Text fontSize="sm" color="gray.500">3 hours ago</Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="sm">
              <Heading size="md" mb={4}>Quick Actions</Heading>
              <VStack spacing={4} align="stretch">
                <Button leftIcon={<FiUsers />} variant="outline">
                  Manage Users
                </Button>
                <Button leftIcon={<FiFolder />} variant="outline">
                  Create Project
                </Button>
                <Button leftIcon={<FiCheckSquare />} variant="outline">
                  Add Task
                </Button>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
} 