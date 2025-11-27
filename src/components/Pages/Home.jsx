import React from 'react';
import HeroCarousel from '../HeroCarousel/HeroCarousel.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import {posts} from '../../Api/Api.js';

import PostGrid from '../PostGrid/PostGrid.jsx';
import PopularPostGrid from '../PostGrid/PopularPostGrid.jsx';
import TrendingPost from '../PostGrid/TrendingPost.jsx';
import Footer from '../Footer/Footer.jsx'

import Post from "../Post/Post.jsx"

export default function Home(){
    return(
        <>
            <Navigation/>
            <HeroCarousel/>
            <PopularPostGrid posts={posts}/>
            <TrendingPost/>
            <PostGrid posts={posts} heading="Latest Posts" postperpage={4}/>
            <Footer/>
        </>
    );

} 