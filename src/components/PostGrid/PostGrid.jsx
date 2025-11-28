
import React, { useState } from 'react';
import PostCard from '../Post/PostCard';
import { SimpleGrid, Box, Heading, Divider, VStack } from '@chakra-ui/react';
import Pagination from '../Pagination/Pagination';

export default function PostGrid({posts,heading,postperpage=8}) {
  const [allPosts, setAllPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(0);

  const postsPerPage = postperpage;
  const pageCount = Math.ceil(allPosts.length / postsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * postsPerPage;
  const currentPosts = allPosts.slice(offset, offset + postsPerPage);

  return (
    <>
      <Box className='container' px={{ base: "20px", md: "50px", lg: "100px", xl: "200px" }} py={{ base: 8, md: 12, lg: 16 }}>
        <VStack align="flex-start" spacing={2} mb={6}>
          <Heading as="h3" size={{ base: "sm", md: "md" }} textTransform={"uppercase"}>
            {heading}
          </Heading>
          <Divider borderColor="#d35a3c" borderWidth="1px" width="90%" />
        </VStack>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }} spacing={{ base: 4, md: 6, lg: 8, xl: 10 }}>
          {currentPosts.map((item) => (
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
      <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  );
}
