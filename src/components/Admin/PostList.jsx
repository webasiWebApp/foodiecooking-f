
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../Api/Api';
import axios from 'axios';
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
  useToast,
} from '@chakra-ui/react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setDeleting(postId);
      try {
        await axios.delete(`/api/recipes/${postId}`);
        
        // Remove the deleted post from state
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        
        toast({
          title: 'Post deleted',
          description: 'The post has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Failed to delete post:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete the post. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setDeleting(null);
      }
    }
  };

  const tableBg = useColorModeValue('white', 'gray.700');

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <Button 
                    size="sm" 
                    colorScheme="red" 
                    onClick={() => handleDelete(post.id)}
                    isLoading={deleting === post.id}
                    loadingText="Deleting"
                  >
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
