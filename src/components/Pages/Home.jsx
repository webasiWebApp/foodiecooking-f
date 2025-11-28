import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroCarousel from '../HeroCarousel/HeroCarousel.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import PostGrid from '../PostGrid/PostGrid.jsx';
import PopularPostGrid from '../PostGrid/PopularPostGrid.jsx';
import TrendingPost from '../PostGrid/TrendingPost.jsx';
import Footer from '../Footer/Footer.jsx';

import { getPosts } from '../../Api/Api.js'

export default function Home() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
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
        <>
            <Navigation />
            <HeroCarousel />
            <PopularPostGrid posts={post} />
            <TrendingPost />
            <PostGrid posts={post} heading="Latest Posts" postperpage={4} />
            <Footer />
        </>
    );
}