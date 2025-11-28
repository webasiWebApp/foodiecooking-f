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
    <Box maxW={{ base: "95%", md: "90%", lg: "80%" }} mx="auto" py={{ base: 6, md: 8, lg: 10 }} px={{ base: 2, md: 4 }} >

      {/* SECTION 1 — Gallery Slider + Right Info */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 4, md: 6 }} mt={{ base: '80px', md: '100px' }}>
          <GridItem>

        {/* Main Image + Thumbnails using Swiper */}
        <Box w={{ base: "100%", md: "90%" }} overflow={"hidden"}>
          {/* MAIN SLIDER */}
          <Swiper
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            style={{ width: "100%", height: "auto", maxHeight: "350px" }}
          >
            {carouselImages.map((img,i)=>(
              <SwiperSlide key={i}>
                <Image src={img} objectFit="cover" w="100%" h={{ base: "250px", md: "350px" }} borderRadius="md"/>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* THUMBNAILS */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            style={{ marginTop:"10px" }}
            breakpoints={{
              480: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 5,
              }
            }}
          >
            {carouselImages.map((img,i)=>(
              <SwiperSlide key={i}>
                <Image src={img} objectFit="cover" borderRadius="md" h={{ base: "50px", md: "60px" }} cursor="pointer" border="2px solid #ccc"/>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        </GridItem>

        <GridItem>
        {/* Right Section */}
        <VStack align="start" spacing={{ base: 3, md: 4 }}>
          <Heading size={{ base: "lg", md: "xl" }}>{postData.title || 'Recipe Title'}</Heading>
          <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
            {postData.summary || postData.description || 'A short description of the recipe, summary & purpose.'}
          </Text>

          <HStack flexWrap="wrap" spacing={{ base: 2, md: 3 }}>
            <Badge colorScheme="green" fontSize={{ base: "xs", md: "sm" }}>{postData.time || 5} min</Badge>
            <Badge colorScheme={postData.difficulty === "Hard" ? "red" : postData.difficulty === "Medium" ? "orange" : "green"} fontSize={{ base: "xs", md: "sm" }}>
              {postData.difficulty || 'Easy'}
            </Badge>
            <Badge colorScheme="yellow" fontSize={{ base: "xs", md: "sm" }}>⭐ {postData.rating || 4.3}</Badge>
            <Badge colorScheme="purple" fontSize={{ base: "xs", md: "sm" }}>Posted • {postData.posted || '5 days ago'}</Badge>
          </HStack>

          <Heading size={{ base: "sm", md: "md" }} mt={3}>Ingredients</Heading>
          {postData.ingredients && typeof postData.ingredients === 'string' ? (
            <Text fontSize={{ base: "sm", md: "md" }}>{postData.ingredients}</Text>
          ) : postData.ingredients && Array.isArray(postData.ingredients) ? (
            postData.ingredients.map((ing, i) => (
              <Text key={i} fontSize={{ base: "sm", md: "md" }}>{ing.name}: {ing.quantity}</Text>
            ))
          ) : (
            <>
              <Text fontSize={{ base: "sm", md: "md" }}>Chilli: 250g</Text>
              <Text fontSize={{ base: "sm", md: "md" }}>Sugar: 100g</Text>
            </>
          )}
        </VStack>

        </GridItem>
      </Grid>

      {/* SECTION 2 — Recipe Content */}
      <Box mt={{ base: 8, md: 10, lg: 14 }}>
       
        <Text textAlign="center" color="gray.600" maxW="850px" mx="auto" fontSize={{ base: "sm", md: "md" }} px={{ base: 2, md: 0 }}>
          {postData.recipeArticle || "'Tis the season for baking batch after batch of Christmas cookies."}
        </Text>

        {postData.images && postData.images[0] && (
          <Image src={postData.images[0]} my={{ base: 3, md: 5 }} borderRadius="md"/>
        )}
      </Box>

      {/* SECTION 3 — Similar Posts */}
      <Box mt={{ base: 10, md: 12, lg: 16 }} px={{ base: 2, md: 0 }}>
        <Heading size={{ base: "md", md: "lg" }}>Similar Posts</Heading>
        <Divider mt="3" mb="6" borderColor="#d35a3c65" borderWidth="1px" width="90%" />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={{ base: 4, md: 6 }}>
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
      <Box mt={{ base: 10, md: 12, lg: 16 }} px={{ base: 2, md: 0 }}>
        <Flex justify="space-between" align="center" flexDirection={{ base: "column", sm: "row" }} gap={{ base: 3, sm: 0 }}>
          <Heading size={{ base: "md", md: "lg" }}>Reviews</Heading>
          <Button colorScheme="orange" onClick={onOpen} size={{ base: "sm", md: "md" }}>Write Review</Button>
         
        </Flex>

        <Divider my={4}/>

        {postData.reviews.map((r,i)=>(
          <Box key={i} p={{ base: 3, md: 4 }} border="1px solid #ddd" rounded="md" mb={3}>
            <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{r.authername} <br/>  <Badge colorScheme="yellow" fontSize={{ base: "xs", md: "sm" }}>⭐ {r.rating || 4.3}</Badge></Text>
            <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>{r.authermail}</Text>
            <Text mt={1} fontSize={{ base: "sm", md: "md" }}>{r.review}</Text>
            {r.image && <img src={r.image} alt="Review Image" style={{ maxWidth: '100px', borderRadius: '3px', marginTop: '8px' }} />}
          </Box>
        ))}
      </Box>

      {/* MODAL — ADD REVIEW */}
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "md" }}>
        <ModalOverlay/>
        <ModalContent p={{ base: 2, md: 4 }} mx={{ base: 2, md: 0 }}>
          <ModalHeader fontSize={{ base: "lg", md: "xl" }}>Write a Review</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <FormControl mt={3} isRequired>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Name</FormLabel>
              <Input 
                name="authername"
                value={reviewForm.authername}
                onChange={handleReviewChange}
                placeholder="Your Name"
                size={{ base: "sm", md: "md" }}
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Email</FormLabel>
              <Input 
                name="authermail"
                type="email"
                value={reviewForm.authermail}
                onChange={handleReviewChange}
                placeholder="Your Email"
                size={{ base: "sm", md: "md" }}
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Rating</FormLabel>
              <HStack spacing={{ base: 1, md: 2 }}>
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
                      size={window.innerWidth < 768 ? 24 : 32}
                      fill={star <= reviewForm.rating ? '#f59e0b' : 'none'}
                      stroke={star <= reviewForm.rating ? '#f59e0b' : '#d1d5db'}
                      strokeWidth={2}
                    />
                  </Box>
                ))}
              </HStack>
              {reviewForm.rating > 0 && (
                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" mt={2}>
                  You rated: {reviewForm.rating} star{reviewForm.rating > 1 ? 's' : ''}
                </Text>
              )}
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Review</FormLabel>
              <Textarea 
                name="review"
                rows={4}
                value={reviewForm.review}
                onChange={handleReviewChange}
                placeholder="Write your review..."
                size={{ base: "sm", md: "md" }}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Upload Photo</FormLabel>
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                size={{ base: "sm", md: "md" }}
              />
            </FormControl>

            <Button 
              colorScheme="orange" 
              w="full" 
              mt={4}
              onClick={handleSubmitReview}
              isLoading={submitting}
              loadingText="Submitting..."
              size={{ base: "sm", md: "md" }}
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
