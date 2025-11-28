import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroCarousel from '../HeroCarousel/HeroCarousel.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import PostGrid from '../PostGrid/PostGrid.jsx';
import PopularPostGrid from '../PostGrid/PopularPostGrid.jsx';
import TrendingPost from '../PostGrid/TrendingPost.jsx';
import Footer from '../Footer/Footer.jsx'

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/recipes')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <Navigation />
            <HeroCarousel />
            <PopularPostGrid posts={posts} />
            <TrendingPost />
            <PostGrid posts={posts} heading="Latest Posts" postperpage={4} />
            <Footer />
        </>
    );
}