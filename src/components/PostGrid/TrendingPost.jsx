import React from 'react';
import { Box, Heading, Image, VStack, Divider, Grid, GridItem, Flex, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { posts } from '../../Api/Api.js';
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
                        bg={index === currentIndex ? "green.600" : "gray.300"}
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
    return (
        <Box className='container' px={{ base: "20px", md: "50px" }} py={8}>
            <VStack align="flex-start" spacing={2} mb={6}>
                <Heading as="h3" size="md">
                    Trending Post
                </Heading>
                <Divider borderColor="green.800" borderWidth="1px" width="90%" />
            </VStack>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <GridItem>
                    <Image
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop"
                        alt="Featured content"
                        borderRadius="xl"
                        objectFit="cover"
                        w="100%"
                        h={{ base: "300px", md: "500px" }}
                        boxShadow="2xl"
                    />
                </GridItem>

                <GridItem >
                    <Flex justify="center">
                        <SimpleCarousel>
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    id={post.id}
                                    imageSrc={post.image}
                                    difficulty={post.difficulty}
                                    rating={post.rating}
                                    duration={`${post.time} min`}
                                    postedTime={post.posted}
                                    title={post.title}
                                    description={post.description}
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
