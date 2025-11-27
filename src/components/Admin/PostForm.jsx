
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { posts as initialPosts } from '../../Api/Api';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const PostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    category: '',
    summary: '',
    difficulty: 'easy',
    time: '',
    images: [''],
    ingredients: '',
    article: '',
  });

  useEffect(() => {
    if (postId) {
      const existingPost = initialPosts.find((p) => p.id === parseInt(postId));
      if (existingPost) {
        setPost({
          ...existingPost,
          summary: existingPost.description || '',
          images: existingPost.image ? [existingPost.image] : [''],
        });
      }
    }
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...post.images];
    newImages[index] = value;
    setPost({ ...post, images: newImages });
  };

  const addImageField = () => {
    if (post.images.length < 5) {
      setPost({ ...post, images: [...post.images, ''] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save this to the backend.
    console.log("Submitting Post:", post);
    navigate('/admin/dashboard');
  };

  const formBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={formBg} p={8} rounded="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={6}>
        {postId ? 'Edit Post' : 'Create Post'}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={post.title} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input name="category" value={post.category || ''} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Summary</FormLabel>
            <Textarea name="summary" value={post.summary} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Difficulty</FormLabel>
            <Select name="difficulty" value={post.difficulty} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Cooking Time (in minutes)</FormLabel>
            <Input name="time" type="number" value={post.time} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Images (up to 5)</FormLabel>
            {post.images.map((image, index) => (
              <Input
                key={index}
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                mb={2}
                placeholder="https://example.com/image.png"
              />
            ))}
            {post.images.length < 5 && (
              <Button size="sm" onClick={addImageField}>
                Add Another Image
              </Button>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Ingredients (JSON format)</FormLabel>
            <Textarea
              name="ingredients"
              value={post.ingredients || ''}
              onChange={handleChange}
              placeholder={'[{"name": "Flour", "quantity": "2 cups"}]'}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Recipe Article</FormLabel>
            <Textarea name="article" value={post.article || ''} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            {postId ? 'Update Post' : 'Create Post'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PostForm;
