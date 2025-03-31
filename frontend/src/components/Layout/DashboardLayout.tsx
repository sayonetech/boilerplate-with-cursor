import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <Flex h="100vh" bg="gray.50">
      <Sidebar />
      <Box ml="250px" w="calc(100% - 250px)" p={8}>
        <Outlet />
      </Box>
    </Flex>
  );
} 