import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text } from '@chakra-ui/react';
import Navigation from '../Navigation/Navigation.jsx';
import PostGrid from '../PostGrid/PostGrid.jsx';
import Footer from '../Footer/Footer.jsx';

export default function Category() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryPosts = async () => {
            if (!category) {
                setError('No category specified');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`/api/recipes?category=${category}`);
                setPosts(response.data);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch category posts:', error);
                setError('Failed to load recipes for this category');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryPosts();
    }, [category]);

    if (loading) {
        return (
            <>
                <Navigation />
                <Box maxW="80%" mx="auto" py={10} px={4} minH="60vh" display="flex" alignItems="center" justifyContent="center">
                    <Text fontSize="xl">Loading...</Text>
                </Box>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navigation />
                <Box maxW="80%" mx="auto" py={10} px={4} minH="60vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <Heading size="lg" color="red.500" mb={4}>Error</Heading>
                    <Text fontSize="lg">{error}</Text>
                </Box>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navigation />
            <Box maxW="80%" mx="auto"  px={4} pt="100px">
                <Heading size="xl" mb={2} textTransform="capitalize">
                    {category} Recipes
                </Heading>
                <Text color="gray.600" mb={6}>
                    {posts.length} {posts.length === 1 ? 'recipe' : 'recipes'} found
                </Text>
                
                {posts.length > 0 ? (
                    <PostGrid posts={posts} heading={`${category} Recipes`} postperpage={8} />
                ) : (
                    <Box textAlign="center" py={10}>
                        <Text fontSize="lg" color="gray.500">
                            No recipes found in this category
                        </Text>
                    </Box>
                )}
            </Box>
            <Footer />
        </>
    );
}
