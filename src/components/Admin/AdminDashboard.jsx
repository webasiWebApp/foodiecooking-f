
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  Link,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';

const AdminDashboard = () => {
  const sidebarBg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Flex minH="100vh">
      <Box w="250px" bg={sidebarBg} p={4}>
        <Heading as="h2" size="lg" mb={8}>
          Admin Menu
        </Heading>
        <VStack as="nav" spacing={4} align="stretch">
          <Link
            as={NavLink}
            to="/admin/dashboard"
            end // To match the exact path
            _activeLink={{
              fontWeight: 'bold',
              color: 'blue.500',
            }}
          >
            All Posts
          </Link>
          <Link
            as={NavLink}
            to="/admin/dashboard/new"
            _activeLink={{
              fontWeight: 'bold',
              color: 'blue.500',
            }}
          >
            New Post
          </Link>
        </VStack>
      </Box>
      <Box flex={1} p={8}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
