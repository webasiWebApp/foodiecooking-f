import { Flex, Link, Text, Container, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

const footerData = [
  {
    label: 'Navigation',
    links: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' }
    ]
  },
  {
    label: 'Categories',
    links: [
      { label: 'College Ramen', href: '#' },
      { label: 'Healthy', href: '#' },
      { label: 'Crockpot', href: '#' },
      { label: 'Frugal', href: '#' },
      { label: 'Sides', href: '#' }
    ]
  },
  {
    label: 'Legal',
    links: [
      { label: 'Terms and Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  }
];

const Footer = () => {
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }} borderTop="2px solid #d35a3c" mt={10}>
      <VStack spacing={8} alignItems="initial">
        <Flex
          flexWrap="wrap"
          direction={{ base: 'column', md: 'row' }}
          alignItems="start"
          justifyContent="space-between"
          gap={6}
        >
          {footerData.map((data, index) => (
            <Flex key={index} direction="column" mb="3">
              <Text
                fontWeight="600"
                fontSize="lg"
                mb={3}
                color="gray.800"
              >
                {data.label}
              </Text>
              <Flex direction="column" gap={2}>
                {data.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    fontSize="md"
                    href={link.href}
                    color="gray.600"
                    _hover={{ color: 'orange.600', textDecoration: 'underline' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>

        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          alignItems="center" 
          justifyContent="space-between"
          borderTop="1px"
          borderColor="gray.200"
          pt={6}
          gap={4}
        >
          <HStack spacing={4}>
            <Link href="https://facebook.com" isExternal aria-label="Facebook">
              <Icon as={FaFacebook} boxSize={6} color="gray.600" _hover={{ color: 'blue.600' }} />
            </Link>
            <Link href="https://twitter.com" isExternal aria-label="Twitter">
              <Icon as={FaTwitter} boxSize={6} color="gray.600" _hover={{ color: 'blue.400' }} />
            </Link>
            <Link href="https://pinterest.com" isExternal aria-label="Pinterest">
              <Icon as={FaPinterest} boxSize={6} color="gray.600" _hover={{ color: 'red.600' }} />
            </Link>
          </HStack>
        </Flex>

        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          alignItems="center" 
          justifyContent="space-between"
          fontSize="sm"
          color="gray.600"
          gap={2}
        >
          <Text>
            &copy; 2025 FoodieCooking.com. All rights reserved.
          </Text>
          <Text>
            Design by{' '}
            <Link 
              href="https://webasi.co" 
              isExternal 
              color="orange.600"
              _hover={{ textDecoration: 'underline' }}
            >
              WEBASI
            </Link>
          </Text>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Footer;