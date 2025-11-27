import React, { useState } from "react";
import {
  Grid, GridItem ,Box, Flex, Heading, Text, Badge, Image, VStack,
  HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
  ModalCloseButton, FormControl, FormLabel, Input, Textarea, useDisclosure,
  SimpleGrid, Divider,Breadcrumb
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import PostCard from "./PostCard"; // your existing component
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Post = () => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const carouselImages = [
    "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?","https://images.unsplash.com/5/unsplash-kitsune-4.jpg?"
  ];

  const similarPosts = [
    { id:1, image:"https://images.unsplash.com/5/unsplash-kitsune-4.jpg?", difficulty:"Easy", rating:4.5, time:20, posted:"2 days", title:"Snowflake Cookies", description:"Soft & sweet winter cookies" },
    { id:2, image:"https://images.unsplash.com/5/unsplash-kitsune-4.jpg?", difficulty:"Medium", rating:4.2, time:15, posted:"1 week", title:"Choco Chip Stars", description:"Crunchy edges, gooey inside" },
    { id:3, image:"https://images.unsplash.com/5/unsplash-kitsune-4.jpg?", difficulty:"Hard", rating:4.9, time:30, posted:"4 days", title:"Jammy Ginger Hearts", description:"Ginger + strawberry jam blend" },
    { id:4, image:"https://images.unsplash.com/5/unsplash-kitsune-4.jpg?", difficulty:"Medium", rating:4.1, time:25, posted:"3 days", title:"Holiday Almond Crunch", description:"Nutty and festive!" }
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reviews, setReviews] = useState([
    { name:"John Doe", email:"john@mail.com", rating:5, review:"Amazing cookies!!" }
  ]);

  return (
    <><Navigation/>
    <Box maxW="80%" mx="auto" py={10} px={4}>

      {/* SECTION 1 — Gallery Slider + Right Info */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} >
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
          <Heading>Christmas Cookies For The Most Wonderful Time</Heading>
          <Text color="gray.600">
            A short description of the recipe, summary & purpose.
            A delightful seasonal treat loved by all.
          </Text>

          <HStack>
            <Badge colorScheme="green">5 min</Badge>
            <Badge colorScheme="red">Hard</Badge>
            <Badge colorScheme="yellow">⭐ 4.3</Badge>
            <Badge colorScheme="purple">Posted • 5 days ago</Badge>
          </HStack>

          <Heading size="md" mt={3}>Ingredients</Heading>
          <Text>Chilli: 250g</Text>
          <Text>Sugar: 100g</Text>
        </VStack>

        </GridItem>
      </Grid>

      {/* SECTION 2 — Recipe Content */}
      <Box mt={14}>
        <Heading textAlign="center" mb={6}>
          53 Christmas Cookies for the Most Wonderful Time of the Year
        </Heading>
        <Text textAlign="center" color="gray.600" maxW="850px" mx="auto">
          'Tis the season for baking batch after batch of Christmas cookies.
        </Text>

        <Image src="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?" my={5} borderRadius="md"/>
      </Box>

      {/* SECTION 3 — Similar Posts */}
      <Box mt={16}>
        <Heading mb={5}>Similar Posts</Heading>
        <SimpleGrid columns={{ base:1, sm:2, md:4 }} spacing={6}>
          {similarPosts.map(item=>(
            <PostCard
              key={item.id}
              id={item.id}
              imageSrc={item.image}
              difficulty={item.difficulty}
              rating={item.rating}
              duration={`${item.time} min`}
              postedTime={item.posted}
              title={item.title}
              description={item.description}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* SECTION 4 — Reviews */}
      <Box mt={16}>
        <Flex justify="space-between" align="center">
          <Heading>Reviews</Heading>
          <Button colorScheme="blue" onClick={onOpen}>Write Review</Button>
        </Flex>

        <Divider my={4}/>

        {reviews.map((r,i)=>(
          <Box key={i} p={4} border="1px solid #ddd" rounded="md" mb={3}>
            <Text fontWeight="bold">{r.name} • ⭐ {r.rating}</Text>
            <Text color="gray.500" fontSize="sm">{r.email}</Text>
            <Text mt={1}>{r.review}</Text>
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
            <FormControl mt={3}>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Your Name"/>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Your Email"/>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Rating (1-5)</FormLabel>
              <Input type="number" min="1" max="5"/>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Review</FormLabel>
              <Textarea rows={4}/>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Upload Photos</FormLabel>
              <Input type="file" multiple/>
            </FormControl>

            <Button colorScheme="green" w="full" mt={4}>Submit Review</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
    <Footer/>
    </>
  );
};

export default Post;
