import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Grid,
  GridItem,
  Icon,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: "We'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      detail: '123 Culinary Street, Food City, FC 12345',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+1 (555) 123-4567',
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'hello@foodiecooking.com',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      detail: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <>
      <Navigation />
      <Box pt="70px" minH="100vh">
        <Container maxW="1200px" py={16}>
          {/* Header */}
          <VStack spacing={4} mb={12} textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              color="#d35a3c"
              textTransform="uppercase"
            >
              Contact Us
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={10}>
            {/* Contact Information */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading as="h2" size="lg" mb={4} color="#d35a3c">
                    Get in Touch
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    Whether you have a recipe suggestion, partnership inquiry, or just want to say hello, we're here to help!
                  </Text>
                </Box>

                {contactInfo.map((item, index) => (
                  <HStack
                    key={index}
                    p={4}
                    bg={bgColor}
                    borderRadius="md"
                    boxShadow="sm"
                    border="1px"
                    borderColor={borderColor}
                    spacing={4}
                  >
                    <Box
                      p={3}
                      bg="#d35a3c"
                      color="white"
                      borderRadius="md"
                    >
                      <Icon as={item.icon} boxSize={6} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="sm" color="gray.500">
                        {item.title}
                      </Text>
                      <Text fontSize="md" fontWeight="medium">
                        {item.detail}
                      </Text>
                    </VStack>
                  </HStack>
                ))}

                {/* Social Media */}
                <Box mt={6}>
                  <Text fontWeight="bold" mb={3}>
                    Follow Us
                  </Text>
                  <HStack spacing={4}>
                    <Box
                      as="a"
                      href="#"
                      p={3}
                      bg="#d35a3c"
                      color="white"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: '#bb5100' }}
                      transition="all 0.3s"
                    >
                      Facebook
                    </Box>
                    <Box
                      as="a"
                      href="#"
                      p={3}
                      bg="#d35a3c"
                      color="white"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: '#bb5100' }}
                      transition="all 0.3s"
                    >
                      Instagram
                    </Box>
                    <Box
                      as="a"
                      href="#"
                      p={3}
                      bg="#d35a3c"
                      color="white"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: '#bb5100' }}
                      transition="all 0.3s"
                    >
                      Twitter
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </GridItem>

            {/* Contact Form */}
            <GridItem>
              <Box
                as="form"
                onSubmit={handleSubmit}
                p={8}
                bg={bgColor}
                borderRadius="lg"
                boxShadow="lg"
                border="1px"
                borderColor={borderColor}
              >
                <Heading as="h2" size="lg" mb={6} color="#d35a3c">
                  Send us a Message
                </Heading>
                <VStack spacing={4}>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    size="lg"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    size="lg"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    size="lg"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    size="lg"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="submit"
                    colorScheme="orange"
                    bg="#d35a3c"
                    size="lg"
                    width="100%"
                    isLoading={submitting}
                    loadingText="Sending..."
                    _hover={{ bg: '#bb5100' }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </GridItem>
          </Grid>

          {/* Map Section */}
          <Box mt={16}>
            <Heading as="h2" size="lg" mb={6} textAlign="center" color="#d35a3c">
              Our Location
            </Heading>
            <Box
              w="100%"
              h="400px"
              bg="gray.200"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1543924975886"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
