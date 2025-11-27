import React, { useState, useEffect } from 'react';
import PostCard from '../Post/PostCard';
import PostCardH from '../Post/PostCardH';

import { Grid, GridItem, Box, VStack ,HStack, Heading, Divider } from "@chakra-ui/react";

export default function PopularPostGrid({posts}){

    const [post,setPost] = useState(posts);

    useEffect(() => {
        setPost(posts);
    }, [posts]);

    if (!post || post.length < 4) {
        return null; 
    }

    return(

        <Box className='container' px="50px" py={8}>
            <VStack align="flex-start" spacing={2} mb={6}>
                <Heading as="h3" size="md">
                    Popular Post
                </Heading>
                <Divider borderColor="green.800" borderWidth="1px" width="90%" />
            </VStack>
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={6}
            >
                <GridItem>
                    <HStack spacing={6}>
                        <PostCard
                            key={post[0].id}
                            id={post[0].id}
                            imageSrc={post[0].image}
                            difficulty={post[0].difficulty}
                            rating={post[0].rating}
                            duration={`${post[0].time} min`}
                            postedTime={post[0].posted}
                            title={post[0].title}
                            description={post[0].description}
                        />

                        <PostCard
                            key={post[1].id}
                            id={post[1].id}
                            imageSrc={post[1].image}
                            difficulty={post[1].difficulty}
                            rating={post[1].rating}
                            duration={`${post[1].time} min`}
                            postedTime={post[1].posted}
                            title={post[1].title}
                            description={post[1].description}
                        />

                    </HStack>

                </GridItem>
                <GridItem>
                    <VStack spacing={6}>
                        <PostCardH
                            key={post[2].id}
                            id={post[2].id}
                            imageSrc={post[2].image}
                            difficulty={post[2].difficulty}
                            rating={post[2].rating}
                            duration={`${post[2].time} min`}
                            postedTime={post[2].posted}
                            title={post[2].title}
                            description={post[2].description}
                        />
                        <PostCardH
                            key={post[3].id}
                            id={post[3].id}
                            imageSrc={post[3].image}
                            difficulty={post[3].difficulty}
                            rating={post[3].rating}
                            duration={`${post[3].time} min`}
                            postedTime={post[3].posted}
                            title={post[3].title}
                            description={post[3].description}
                        />
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
}
