import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import {
  Grid, GridItem ,Box, Flex, Heading, Text, Badge, Image, VStack,
  HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
  ModalCloseButton, FormControl, FormLabel, Input, Textarea, useDisclosure,
  SimpleGrid, Divider,Breadcrumb
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import PostCard from "./PostCard"; // your existing component
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { uploadReviewImage } from "../../utils/appwriteStorage";

const Post = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reviews, setReviews] = useState([
    { name:"John Doe", email:"john@mail.com", rating:5, review:"Amazing cookies!!" }
  ]);
  const [similarPosts, setSimilarPosts] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    authername: '',
    authermail: '',
    rating: '',
    review: '',
    imageFile: null
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setPostData(response.data);
        
        // Fetch similar posts based on category
        if (response.data.category) {
          try {
            const similarResponse = await axios.get(`/api/recipes?category=${response.data.category}`);
            // Filter out the current post and limit to 4 posts
            const filtered = similarResponse.data.filter(post => post.id !== response.data.id).slice(0, 4);
            setSimilarPosts(filtered);
          } catch (error) {
            console.error('Error fetching similar posts:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating) => {
    setReviewForm(prev => ({ ...prev, rating: rating }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 1MB = 1048576 bytes)
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        alert('Image size must be less than 1MB. Please choose a smaller image.');
        e.target.value = ''; // Reset file input
        return;
      }
      setReviewForm(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.authername || !reviewForm.authermail || !reviewForm.rating || !reviewForm.review) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = '';
      
      // Upload image to Appwrite if provided
      if (reviewForm.imageFile) {
        try {
          imageUrl = await uploadReviewImage(reviewForm.imageFile, id);
          console.log('Image uploaded successfully:', imageUrl);
        } catch (error) {
          console.error('Failed to upload image:', error);
          alert('Failed to upload image. Submitting review without image.');
        }
      }

      // Prepare review data with image URL
      const reviewData = {
        review: reviewForm.review,
        authermail: reviewForm.authermail,
        authername: reviewForm.authername,
        rating: parseInt(reviewForm.rating),
        image: imageUrl,
        recipe_id: parseInt(id)
      };

      await axios.post('/api/reviews', reviewData);
      
      // Reset form and close modal
      setReviewForm({
        authername: '',
        authermail: '',
        rating: '',
        review: '',
        imageFile: null
      });
      onClose();
      
      // Optionally refresh the post data to show new review
      const response = await axios.get(`/api/recipes/${id}`);
      setPostData(response.data);
      
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postData) {
    return <div>Post not found</div>;
  }

  const carouselImages = postData.images || [
    "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?"
  ];

  return (
    <><Navigation/>
    <Box maxW="80%" mx="auto" py={10} px={4} >

      {/* SECTION 1 — Gallery Slider + Right Info */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mt={'100px'}>
          <GridItem>

        {/* Main Image + Thumbnails using Swiper */}
        <Box w={"90%"} overflow={"hidden"}>
          {/* MAIN SLIDER */}
          <Swiper
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            style={{ width:"500px", height:"350px" }}
          >
            {carouselImages.map((img,i)=>(
              <SwiperSlide key={i}>
                <Image src={img} objectFit="cover" w="100%" h="350px" borderRadius="md"/>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* THUMBNAILS */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            style={{ marginTop:"10px" }}
          >
            {carouselImages.map((img,i)=>(
              <SwiperSlide key={i}>
                <Image src={img} objectFit="cover" borderRadius="md" h="60px" cursor="pointer" border="2px solid #ccc"/>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        </GridItem>

        <GridItem>
        {/* Right Section */}
        <VStack align="start" spacing={4}>
          <Heading>{postData.title || 'Recipe Title'}</Heading>
          <Text color="gray.600">
            {postData.summary || postData.description || 'A short description of the recipe, summary & purpose.'}
          </Text>

          <HStack>
            <Badge colorScheme="green">{postData.time || 5} min</Badge>
            <Badge colorScheme={postData.difficulty === "Hard" ? "red" : postData.difficulty === "Medium" ? "orange" : "green"}>
              {postData.difficulty || 'Easy'}
            </Badge>
            <Badge colorScheme="yellow">⭐ {postData.rating || 4.3}</Badge>
            <Badge colorScheme="purple">Posted • {postData.posted || '5 days ago'}</Badge>
          </HStack>

          <Heading size="md" mt={3}>Ingredients</Heading>
          {postData.ingredients && typeof postData.ingredients === 'string' ? (
            <Text>{postData.ingredients}</Text>
          ) : postData.ingredients && Array.isArray(postData.ingredients) ? (
            postData.ingredients.map((ing, i) => (
              <Text key={i}>{ing.name}: {ing.quantity}</Text>
            ))
          ) : (
            <>
              <Text>Chilli: 250g</Text>
              <Text>Sugar: 100g</Text>
            </>
          )}
        </VStack>

        </GridItem>
      </Grid>

      {/* SECTION 2 — Recipe Content */}
      <Box mt={14}>
       
        <Text textAlign="center" color="gray.600" maxW="850px" mx="auto">
          {postData.article || "'Tis the season for baking batch after batch of Christmas cookies."}
        </Text>

        {postData.images && postData.images[0] && (
          <Image src={postData.images[0]} my={5} borderRadius="md"/>
        )}
      </Box>

      {/* SECTION 3 — Similar Posts */}
      <Box mt={16}>
        <Heading  size="lg">Similar Posts</Heading>
        <Divider mt="3" mb="6" borderColor="#d35a3c65" borderWidth="1px" width="90%" />
        <SimpleGrid columns={{ base:1, sm:2, md:4 }} spacing={6}>
          {similarPosts.map(item=>(
            <PostCard
              key={item.id}
              id={item.id}
              imageSrc={item.images}
              difficulty={item.difficulty}
              rating={item.rating}
              duration={`${item.time} min`}
              postedTime={item.posted}
              title={item.title}
              description={item.summary}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* SECTION 4 — Reviews */}
      <Box mt={16}>
        <Flex justify="space-between" align="center">
          <Heading size="lg" >Reviews</Heading>
          <Button colorScheme="orange" onClick={onOpen}>Write Review</Button>
         
        </Flex>

        <Divider my={4}/>

        {postData.reviews.map((r,i)=>(
          <Box key={i} p={4} border="1px solid #ddd" rounded="md" mb={3}>
            <Text fontWeight="bold">{r.authername} <br/>  <Badge colorScheme="yellow">⭐ {r.rating || 4.3}</Badge></Text>
            <Text color="gray.500" fontSize="sm">{r.authermail}</Text>
            <Text mt={1}>{r.review}</Text>
            {r.image && <img src={r.image} alt="Review Image" style={{ maxWidth: '100px', borderRadius: '3px', marginTop: '8px' }} />}
          </Box>
        ))}
      </Box>

      {/* MODAL — ADD REVIEW */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent p={4}>
          <ModalHeader>Write a Review</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <FormControl mt={3} isRequired>
              <FormLabel>Name</FormLabel>
              <Input 
                name="authername"
                value={reviewForm.authername}
                onChange={handleReviewChange}
                placeholder="Your Name"
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                name="authermail"
                type="email"
                value={reviewForm.authermail}
                onChange={handleReviewChange}
                placeholder="Your Email"
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>Rating</FormLabel>
              <HStack spacing={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Box
                    key={star}
                    as="button"
                    type="button"
                    onClick={() => handleStarClick(star)}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{ transform: 'scale(1.1)' }}
                  >
                    <Star
                      size={32}
                      fill={star <= reviewForm.rating ? '#f59e0b' : 'none'}
                      stroke={star <= reviewForm.rating ? '#f59e0b' : '#d1d5db'}
                      strokeWidth={2}
                    />
                  </Box>
                ))}
              </HStack>
              {reviewForm.rating > 0 && (
                <Text fontSize="sm" color="gray.600" mt={2}>
                  You rated: {reviewForm.rating} star{reviewForm.rating > 1 ? 's' : ''}
                </Text>
              )}
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>Review</FormLabel>
              <Textarea 
                name="review"
                rows={4}
                value={reviewForm.review}
                onChange={handleReviewChange}
                placeholder="Write your review..."
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Upload Photo</FormLabel>
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </FormControl>

            <Button 
              colorScheme="orange" 
              w="full" 
              mt={4}
              onClick={handleSubmitReview}
              isLoading={submitting}
              loadingText="Submitting..."
            >
              Submit Review
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
    <Footer/>
    </>
  );
};

export default Post;
