import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Image, VStack, Divider, Grid, GridItem, Flex, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PostCard from '../Post/PostCard';

// Simple carousel implementation since react-multi-carousel isn't available
const SimpleCarousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % React.Children.count(children));
        }, 3000);

        return () => clearInterval(timer);
    }, [children]);

    const childArray = React.Children.toArray(children);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + childArray.length) % childArray.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % childArray.length);
    };

    return (
        <Box position="relative" h="100%">
            <Box h="100%">
                {childArray[currentIndex]}
            </Box>
            <Flex justify="center" gap={2} mt={4}>
                {childArray.map((_, index) => (
                    <Box
                        key={index}
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={index === currentIndex ? "orange.600" : "gray.300"}
                        cursor="pointer"
                        onClick={() => setCurrentIndex(index)}
                        transition="all 0.3s"
                    />
                ))}
            </Flex>

            <IconButton
                icon={<LuChevronLeft />}
                onClick={goToPrevious}
                position="absolute"
                left="-40px"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
            />
            <IconButton
                icon={<LuChevronRight />}
                onClick={goToNext}
                position="absolute"
                right="-40px"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
            />
        </Box>
    );
};

const TrendingPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/recipes/top-rated');
                setPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch top-rated posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box className='container' px={{ base: "10px", md: "200px" }} py={16}>
            <VStack align="flex-start" spacing={2} mb={6}>
                <Heading as="h3" size="md" textTransform={"uppercase"}>
                    Trending Post
                </Heading>
                <Divider borderColor="#d35a3c" borderWidth="1px" width="90%" />
            </VStack>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <GridItem>
                    <Image
                        src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Featured content"
                        borderRadius="sm"
                        objectFit="cover"
                        w="100%"
                        h={{ base: "300px", md: "500px" }}
                        
                    />
                </GridItem>

                <GridItem >
                    <Flex justify="center" alignItems={"center"}>
                        <SimpleCarousel>
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    id={post.id}
                                    imageSrc={post.images}
                                    difficulty={post.difficulty}
                                    rating={post.rating}
                                    duration={`${post.time} min`}
                                    postedTime={post.posted}
                                    title={post.title}
                                    description={post.summary}
                                />
                            ))}
                        </SimpleCarousel>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default TrendingPost;
