import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../Post/PostCard';
import PostCardH from '../Post/PostCardH';

import { Grid, GridItem, Box, VStack ,HStack, Heading, Divider } from "@chakra-ui/react";

export default function PopularPostGrid(){

    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const response = await axios.get('/api/recipes/top');
                setPost(response.data);
            } catch (error) {
                console.error('Failed to fetch top posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopPosts();
    }, []);

    if (loading || !post || post.length < 4) {
        return null; 
    }

    return(

        <Box className='container' px={{ base: "20px", md: "50px", lg: "100px", xl: "200px" }} py={16}>
            <VStack align="flex-start" spacing={2} mb={6}>
                <Heading as="h3" size="md" textTransform={"uppercase"}>
                    Popular Post
                </Heading>
                <Divider borderColor="#d35a3c" borderWidth="1px" width="90%" />
            </VStack>
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={6}
            >
                <GridItem>
                    <HStack spacing={{ base: 2, md: 4, lg: 6 }} flexDirection={{ base: "column", sm: "row" }}>
                        <PostCard
                            key={post[0].id}
                            id={post[0].id}
                            imageSrc={post[0].images}
                            difficulty={post[0].difficulty}
                            rating={post[0].rating}
                            duration={`${post[0].time} min`}
                            postedTime={post[0].posted}
                            title={post[0].title}
                            description={post[0].summary}
                        />

                        <PostCard
                            key={post[1].id}
                            id={post[1].id}
                            imageSrc={post[1].images}
                            difficulty={post[1].difficulty}
                            rating={post[1].rating}
                            duration={`${post[1].time} min`}
                            postedTime={post[1].posted}
                            title={post[1].title}
                            description={post[1].summary}
                        />

                    </HStack>

                </GridItem>
                <GridItem>
                    <VStack spacing={{ base: 4, md: 6 }}>
                        <PostCardH
                            key={post[2].id}
                            id={post[2].id}
                            imageSrc={post[2].images}
                            difficulty={post[2].difficulty}
                            rating={post[2].rating}
                            duration={`${post[2].time} min`}
                            postedTime={post[2].posted}
                            title={post[2].title}
                            description={post[2].summary}
                        />
                        <PostCardH
                            key={post[3].id}
                            id={post[3].id}
                            imageSrc={post[3].images}
                            difficulty={post[3].difficulty}
                            rating={post[3].rating}
                            duration={`${post[3].time} min`}
                            postedTime={post[3].posted}
                            title={post[3].title}
                            description={post[3].summary}
                        />
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
}
