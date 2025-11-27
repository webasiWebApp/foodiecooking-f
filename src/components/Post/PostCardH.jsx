import {
    Button,
    Card,
    Image,
    Text,
    Badge,
    Box,
    VStack,
    CardBody,
    CardFooter,
    Heading
  } from "@chakra-ui/react";
  
  import { FiClock, FiStar } from "react-icons/fi";
  import { MdWhatshot } from "react-icons/md";
  import { Link } from "react-router-dom";
  
  const PostCardH = ({
    id,
    imageSrc,
    difficulty,
    duration,
    rating,
    postedTime,
    title,
    description,
  }) => {
    return (
      <Link to={`/post/${id}`}>
      <Card maxW="xl" overflow="hidden" flexDirection="row" position="relative">
  
        {/* Image with overlays */}
        <Box position="relative">
          <Image
            objectFit="cover"
            maxHeight="200px"
            w="100%"
            src={imageSrc}
            alt="Caffe Latte"
          />
  
          {/* BADGES — top-left */}
          <VStack
            position="absolute"
            top="3"
            left="3"
            spacing="2"
            align="flex-start"
          >
            {/* Difficulty */}
            <Badge colorScheme={difficulty=="Hard" ? "red" : difficulty=="Medium" ? "orange" : "green"} display="flex" alignItems="center" gap="1">
            <MdWhatshot size={14} />
            {difficulty}
          </Badge>
  
            {/* Duration */}
            <Badge colorScheme="purple" display="flex" alignItems="center" gap="1">
            <FiClock size={14} />
            {duration}
          </Badge>
  
            {/* Rating */}
            <Badge colorScheme="yellow" display="flex" alignItems="center" gap="1">
            <FiStar size={14} />
            {rating}
            </Badge>
          </VStack>
  
          {/* Posted Time — bottom-left */}
          <Box
          position="absolute"
          bottom="3"
          left="3"
          bg="blackAlpha.700"
          color="white"
          fontSize="xs"
          px="2"
          py="1"
          borderRadius="md"
            >
            {postedTime}
            </Box>
  
        </Box>
  
        {/* Card Body */}
        <CardBody justify="flex-start">
          <Heading size="md">{title}</Heading>
          <Text pt="2">
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
          </Text>
          <Button variant="ghost" colorScheme="blue">View More</Button>
        </CardBody>
  
       
      </Card>
      </Link>
    );
  };
  
  export default PostCardH;
  