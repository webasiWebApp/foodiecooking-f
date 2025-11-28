import { Box, Flex, Image, Heading, Text, VStack, Container, Button, HStack, Divider } from "@chakra-ui/react";
import React from "react";
import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer.jsx";


export default function AboutPage() {
  return (
    <Box>

    <Navigation />
      <Box
        bgImage="url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        bgSize="cover"
        bgPos="center"
        h="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading fontSize="5xl" color="white" textShadow="0px 0px 10px rgba(0,0,0,0.7)">
          About Our Blog
        </Heading>
      </Box>

    
      <Container maxW="5xl" py={12}>
        <Flex direction={{ base: "column", md: "row" }} gap={10} align="center">
          
          <Image
            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About image"
            rounded="xl"
            boxShadow="lg"
            w={{ base: "100%", md: "45%" }}
          />

          <VStack align="start" spacing={5} w={{ base: "100%", md: "55%" }}>
            <Heading fontSize="3xl">Welcome to Foodie Cooking</Heading>
            <Text fontSize="lg" lineHeight="1.8" opacity=".85">
              We share recipes, cooking ideas, kitchen tips, reviews and everything
              that makes your culinary journey more exciting and creative. Food is
              not just about taste — it's an experience, a story, and a culture.
            </Text>
            <Text fontSize="lg" opacity=".85">
              Our goal is to inspire food lovers, beginners and chefs with flavorful
              recipes and useful knowledge.
            </Text>

          </VStack>
        </Flex>

        <Divider my={12} />

        {/* 🔹 Mission & Vision */}
        <HStack spacing={12} flexWrap="wrap" justify="space-between">
          <Box maxW="400px">
            <Heading size="lg" mb={3}>Our Mission</Heading>
            <Text opacity=".85">
              To create a community powered by food enthusiasts and help everyone
              cook better, eat healthier, and enjoy more delicious meals.
            </Text>
          </Box>

          <Box maxW="400px">
            <Heading size="lg" mb={3}>Our Vision</Heading>
            <Text opacity=".85">
              A world where cooking is easy, accessible, creative and enjoyable for all.
            </Text>
          </Box>
        </HStack>
      </Container>

        <Footer />
    </Box>
  );
}
