import { Box, VStack, Text, Icon, Flex, Button } from '@chakra-ui/react';
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiDatabase
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { name: 'Users', icon: FiUsers, path: '/users' },
  { name: 'Data', icon: FiDatabase, path: '/data' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      bg="white"
      w="250px"
      h="100vh"
      boxShadow="lg"
      position="fixed"
      left={0}
      top={0}
      py={8}
    >
      <VStack spacing={2} align="stretch">
        <Box px={6} mb={8}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            Your Logo
          </Text>
        </Box>

        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            justifyContent="flex-start"
            px={6}
            py={3}
            mb={2}
            leftIcon={<Icon as={item.icon} boxSize={5} />}
            bg={location.pathname === item.path ? 'blue.50' : 'transparent'}
            color={location.pathname === item.path ? 'blue.600' : 'gray.600'}
            _hover={{
              bg: 'blue.50',
              color: 'blue.600',
            }}
            onClick={() => navigate(item.path)}
            w="100%"
            borderRadius={0}
            borderRight={location.pathname === item.path ? '4px solid' : 'none'}
            borderColor="blue.600"
          >
            {item.name}
          </Button>
        ))}

        <Box mt="auto" px={6}>
          <Button
            variant="ghost"
            justifyContent="flex-start"
            w="100%"
            leftIcon={<Icon as={FiLogOut} boxSize={5} />}
            onClick={handleLogout}
            color="red.500"
            _hover={{
              bg: 'red.50',
            }}
          >
            Logout
          </Button>
        </Box>
      </VStack>
    </Box>
  );
} 