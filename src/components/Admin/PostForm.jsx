
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts } from '../../Api/Api';
import axios from 'axios';
import { uploadReviewImage } from '../../utils/appwriteStorage';
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
  useToast,
  HStack,
  Image,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { X } from 'lucide-react';

const PostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [post, setPost] = useState({
    title: '',
    category: '',
    summary: '',
    difficulty: 'easy',
    time: '',
    images: [''],
    ingredients: '',
    article: '',
    rating: 0,
    postedTime: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [ingredientFields, setIngredientFields] = useState([{ name: '', quantity: '' }]);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        setLoading(true);
        try {
          const posts = await getPosts();
          const existingPost = posts.find((p) => p.id === parseInt(postId));
          if (existingPost) {
            setPost({
              ...existingPost,
              summary: existingPost.description || '',
              images: existingPost.image ? [existingPost.image] : [''],
              time: existingPost.cookingTime || existingPost.time || '',
              article: existingPost.recipeArticle || existingPost.article || '',
              rating: existingPost.rating || 0,
              postedTime: existingPost.postedTime || new Date().toISOString(),
            });
            
            // Parse ingredients if they exist
            if (existingPost.ingredients || existingPost.ingredient) {
              try {
                const ingredientsData = existingPost.ingredient || existingPost.ingredients;
                const parsedIngredients = typeof ingredientsData === 'string' 
                  ? JSON.parse(ingredientsData) 
                  : ingredientsData;
                setIngredientFields(parsedIngredients.length > 0 ? parsedIngredients : [{ name: '', quantity: '' }]);
              } catch (error) {
                console.error('Failed to parse ingredients:', error);
                setIngredientFields([{ name: '', quantity: '' }]);
              }
            }
          }
        } catch (error) {
          console.error('Failed to fetch post:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (post.images.length + files.length > 5) {
      toast({
        title: 'Too many images',
        description: 'You can only upload up to 5 images.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUploadingImage(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Check file size (max 1MB)
        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
          toast({
            title: 'Image too large',
            description: `${file.name} exceeds 1MB. Please choose a smaller image.`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return null;
        }

        // Upload to Appwrite - use a unique recipe identifier
        const recipeId = postId || `new_${Date.now()}`;
        const imageUrl = await uploadReviewImage(file, recipeId);
        return imageUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null);

      // Add uploaded URLs to images array, filtering out empty strings
      const currentImages = post.images.filter(img => img !== '');
      setPost({ 
        ...post, 
        images: [...currentImages, ...validUrls]
      });

      toast({
        title: 'Images uploaded',
        description: `${validUrls.length} image(s) uploaded successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to upload images:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload images. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUploadingImage(false);
      e.target.value = ''; // Reset file input
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = post.images.filter((_, i) => i !== index);
    setPost({ ...post, images: newImages.length > 0 ? newImages : [''] });
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

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredientFields];
    newIngredients[index][field] = value;
    setIngredientFields(newIngredients);
  };

  const addIngredientField = () => {
    setIngredientFields([...ingredientFields, { name: '', quantity: '' }]);
  };

  const removeIngredientField = (index) => {
    if (ingredientFields.length > 1) {
      const newIngredients = ingredientFields.filter((_, i) => i !== index);
      setIngredientFields(newIngredients);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare the data with all required backend fields
      const postData = {
        title: post.title,
        category: post.category,
        summary: post.summary,
        difficulty: post.difficulty,
        cookingTime: parseInt(post.time) || 0, // Backend expects 'cookingTime'
        images: post.images.filter(img => img !== ''), // Remove empty image fields
        ingredient: JSON.stringify(ingredientFields.filter(ing => ing.name.trim() !== '')), // Backend expects 'ingredient'
        recipeArticle: post.article, // Backend expects 'recipeArticle'
        rating: post.rating || 0,
        postedTime: post.postedTime || new Date().toISOString(),
      };

      if (postId) {
        // Update existing post
        await axios.put(`/api/recipes/${postId}`, postData);
        toast({
          title: 'Post updated',
          description: 'The post has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new post
        await axios.post('/api/recipes', postData);
        toast({
          title: 'Post created',
          description: 'The post has been successfully created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to save post:', error);
      toast({
        title: 'Error',
        description: `Failed to ${postId ? 'update' : 'create'} the post. Please try again.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formBg = useColorModeValue('white', 'gray.700');

  if (loading) {
    return <div>Loading...</div>;
  }

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
            
            {/* Upload Button */}
            {post.images.filter(img => img !== '').length < 5 && (
              <Box mb={4}>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  display="none"
                  id="image-upload"
                />
                <Button
                  as="label"
                  htmlFor="image-upload"
                  colorScheme="teal"
                  isLoading={uploadingImage}
                  loadingText="Uploading..."
                  cursor="pointer"
                >
                  Upload Images
                </Button>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Max 1MB per image. {5 - post.images.filter(img => img !== '').length} slots available.
                </Text>
              </Box>
            )}

            {/* Image Previews */}
            {post.images.filter(img => img !== '').length > 0 && (
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>Uploaded Images:</Text>
                <HStack spacing={4} wrap="wrap">
                  {post.images.map((image, index) => 
                    image && image !== '' ? (
                      <Box key={index} position="relative" borderRadius="md" overflow="hidden">
                        <Image 
                          src={image} 
                          alt={`Recipe ${index + 1}`} 
                          boxSize="100px"
                          objectFit="cover"
                        />
                        <IconButton
                          icon={<X size={16} />}
                          size="xs"
                          colorScheme="red"
                          position="absolute"
                          top={1}
                          right={1}
                          onClick={() => handleRemoveImage(index)}
                          aria-label="Remove image"
                        />
                      </Box>
                    ) : null
                  )}
                </HStack>
              </Box>
            )}

            {/* Manual URL Input (fallback) */}
            <Box>
              <Text fontWeight="bold" mb={2}>Or enter image URLs manually:</Text>
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
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel>Ingredients</FormLabel>
            {ingredientFields.map((ingredient, index) => (
              <HStack key={index} mb={2} alignItems="flex-start">
                <Input
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  flex={2}
                />
                <Input
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  flex={1}
                />
                {ingredientFields.length > 1 && (
                  <IconButton
                    icon={<X size={16} />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => removeIngredientField(index)}
                    aria-label="Remove ingredient"
                  />
                )}
              </HStack>
            ))}
            <Button onClick={addIngredientField} size="sm" mt={2}>
              Add Ingredient
            </Button>
          </FormControl>
          <FormControl>
            <FormLabel>Recipe Article</FormLabel>
            <Textarea name="article" value={post.article || ''} onChange={handleChange} />
          </FormControl>
          <Button 
            type="submit" 
            colorScheme="blue"
            isLoading={submitting}
            loadingText={postId ? 'Updating...' : 'Creating...'}
          >
            {postId ? 'Update Post' : 'Create Post'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PostForm;
