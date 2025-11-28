import React from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Divider,
} from '@chakra-ui/react';

export default function TermsConditions() {
  return (
    <>
      <Navigation />
      <Box pt="70px" minH="100vh" bg="gray.50">
        <Container maxW="900px" py={16}>
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <Box textAlign="center" mb={8}>
              <Heading
                as="h1"
                size="2xl"
                color="#d35a3c"
                textTransform="uppercase"
                mb={4}
              >
                Terms and Conditions
              </Heading>
              <Text fontSize="sm" color="gray.600" fontStyle="italic">
                Last Updated: November 29, 2025
              </Text>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
              <VStack spacing={6} align="stretch">
                <Text>
                  Welcome to <strong>Foodie Cooking</strong>!
                </Text>

                <Text>
                  These terms and conditions outline the rules and regulations for the use of Foodie Cooking's Website, located at www.foodiecooking.com.
                </Text>

                <Text>
                  By accessing this website, we assume you accept these terms and conditions. Do not continue to use Foodie Cooking if you do not agree to take all of the terms and conditions stated on this page.
                </Text>

                <Divider />

                {/* Section 1 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    1. Intellectual Property Rights
                  </Heading>
                  <Text mb={4}>
                    Unless otherwise stated, Foodie Cooking and/or its licensors own the intellectual property rights for all material on Foodie Cooking. All intellectual property rights are reserved.
                  </Text>

                  <Heading as="h3" size="md" color="#5c1605ff" mb={3}>
                    Use of Recipes and Photos
                  </Heading>
                  <Text mb={3}>
                    We work hard to develop our recipes and take our own photographs. Our content is protected by copyright laws.
                  </Text>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>
                      <strong>Photos:</strong> You may not use our photos to promote your own products or recipes without prior written permission. If you wish to share our content, you may use <strong>one</strong> photo with a clear link back to the original post on our site.
                    </ListItem>
                    <ListItem>
                      <strong>Recipes:</strong> You may not copy and paste full recipes (ingredients and instructions) onto your own website or social media. If you are a fellow blogger, please rewrite the recipe in your own words and link back to us as the source.
                    </ListItem>
                  </UnorderedList>
                </Box>

                <Divider />

                {/* Section 2 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    2. Nutritional Information Disclaimer
                  </Heading>
                  <Box bg="orange.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="#d35a3c" mb={4}>
                    <Text fontWeight="bold">
                      Important: The nutritional information provided on Foodie Cooking is an estimate only.
                    </Text>
                  </Box>
                  <Text mb={3}>
                    We provide nutritional data as a courtesy to our readers. This data is calculated using online calculators and should be considered an estimate. Varying factors such as product types, brands purchased, natural fluctuations in fresh produce, and the processing of ingredients change the effective nutritional information in any given recipe.
                  </Text>
                  <Text>
                    Under no circumstances will Foodie Cooking be responsible for any loss or damage resulting from your reliance on nutritional information given by this site.
                  </Text>
                </Box>

                <Divider />

                {/* Section 3 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    3. Food Safety and Health Disclaimer
                  </Heading>
                  <Text mb={3}>
                    You are responsible for ensuring that any food you cook is safe to eat.
                  </Text>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>
                      <strong>Food Handling:</strong> Always use safe food handling practices. Cook meats, poultry, and seafood to safe internal temperatures as recommended by food safety authorities (e.g., the FDA or USDA).
                    </ListItem>
                    <ListItem>
                      <strong>Allergies:</strong> Foodie Cooking is not responsible for adverse reactions to food consumed, such as food poisoning or allergic reactions. It is the reader's responsibility to determine the value and safety of a recipe for their specific dietary needs.
                    </ListItem>
                  </UnorderedList>
                </Box>

                <Divider />

                {/* Section 4 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    4. Limitation of Liability
                  </Heading>
                  <Text mb={3}>
                    In no event shall Foodie Cooking, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website. Foodie Cooking shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
                  </Text>
                  <Text>
                    We are not responsible for the outcome of any recipe you try from this website. You may not achieve the same results due to variations in ingredients, humidity, altitude, cooking temperatures, typos, errors, omissions, or individual cooking abilities.
                  </Text>
                </Box>

                <Divider />

                {/* Section 5 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    5. Affiliate Disclosure
                  </Heading>
                  <Text mb={3}>
                    Foodie Cooking may engage in affiliate marketing, which is done by embedding tracking links into the website. If you click on a link for an affiliate partnership, a cookie will be placed on your browser to track any sales for purposes of commissions.
                  </Text>
                  <Text>
                    As an Amazon Associate, we earn from qualifying purchases. This comes at no extra cost to you.
                  </Text>
                </Box>

                <Divider />

                {/* Section 6 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    6. User Comments
                  </Heading>
                  <Text mb={3}>
                    Parts of this website offer an opportunity for users to post and exchange opinions and information (comments). Foodie Cooking does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Foodie Cooking, its agents, and/or affiliates.
                  </Text>
                  <Text>
                    We reserve the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
                  </Text>
                </Box>

                <Divider />

                {/* Section 7 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    7. Links to Third-Party Websites
                  </Heading>
                  <Text>
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by Foodie Cooking. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
                  </Text>
                </Box>

                <Divider />

                {/* Section 8 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    8. Governing Law
                  </Heading>
                  <Text>
                    These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                  </Text>
                </Box>

                <Divider />

                {/* Section 9 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    9. Contact Us
                  </Heading>
                  <Text mb={3}>
                    If you have any questions about these Terms and Conditions, please contact us:
                  </Text>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>
                      By email: hello@foodiecooking.com
                    </ListItem>
                    <ListItem>
                      By visiting this page on our website: <a href="/contact" style={{ color: '#d35a3c', textDecoration: 'underline' }}>Contact Page</a>
                    </ListItem>
                  </UnorderedList>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
