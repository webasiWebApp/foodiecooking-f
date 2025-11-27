import { Button, Card, Image, Text, Badge, Box, VStack, CardBody, CardFooter, Heading } from "@chakra-ui/react";
import { FiClock, FiStar } from "react-icons/fi";
import { MdWhatshot } from "react-icons/md";
import { Link } from "react-router-dom";

const PostCard = ({
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
    <Card maxW="sm" overflow="hidden" position="relative">

      {/* Image with badges on top */}
      <Box position="relative">
        <Image
          src={imageSrc}
          alt={title}
          maxHeight="300px"
        />

        {/* --- BADGES (top-left overlay) --- */}
        <VStack
          position="absolute"
          top="3"
          left="3"
          spacing="2"
          align="flex-start"
        >
          {/* Difficulty Badge - color changes based on difficulty */}
          <Badge colorScheme={difficulty=="Hard" ? "red" : difficulty=="Medium" ? "orange" : "green"} display="flex" alignItems="center" gap="1">
            <MdWhatshot size={14} />
            {difficulty}
          </Badge>

          {/* Duration Badge */}
          <Badge colorScheme="purple" display="flex" alignItems="center" gap="1">
            <FiClock size={14} />
            {duration}
          </Badge>

          {/* Rating Badge */}
          <Badge colorScheme="yellow" display="flex" alignItems="center" gap="1">
            <FiStar size={14} />
            {rating}
          </Badge>
        </VStack>

        {/* Posted Time (bottom-left) */}
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

      <CardBody>
        <Heading size="md">{title}</Heading>
        <Text pt="2">
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
        </Text>
      </CardBody>

      <CardFooter>
        <Button variant="ghost" colorScheme="blue">View More</Button>
      </CardFooter>
    </Card>
    </Link>
  );
};

export default PostCard;
