
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
      <Box className='container' px="50px" py={8}>
        <VStack align="flex-start" spacing={2} mb={6}>
          <Heading as="h3" size="md">
            {heading}
          </Heading>
          <Divider borderColor="green.800" borderWidth="1px" width="90%" />
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {currentPosts.map((item) => (
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
      <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  );
}
