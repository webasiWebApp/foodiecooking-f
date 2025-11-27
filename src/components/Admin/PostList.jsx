
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posts as initialPosts } from '../../Api/Api';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    setPosts(initialPosts);
  }, []);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      // In a real app, you'd also send a delete request to your API
    }
  };

  const tableBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
      <Flex mb={6} align="center">
        <Heading as="h2" size="lg">
          All Posts
        </Heading>
        <Spacer />
        <Link to="/admin/dashboard/new">
          <Button colorScheme="blue">Create New Post</Button>
        </Link>
      </Flex>
      <TableContainer bg={tableBg} rounded="lg" boxShadow="lg">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Difficulty</Th>
              <Th isNumeric>Time (min)</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post.id}>
                <Td>{post.title}</Td>
                <Td>{post.category || 'N/A'}</Td>
                <Td>{post.difficulty}</Td>
                <Td isNumeric>{post.time}</Td>
                <Td>
                  <Link to={`/admin/dashboard/edit/${post.id}`}>
                    <Button size="sm" mr={2}>
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PostList;
