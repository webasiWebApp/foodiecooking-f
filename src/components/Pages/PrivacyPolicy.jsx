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

export default function PrivacyPolicy() {
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
                Privacy Policy
              </Heading>
              <Text fontSize="sm" color="gray.600" fontStyle="italic">
                Last Updated: November 29, 2025
              </Text>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
              <VStack spacing={6} align="stretch">
                <Text>
                  The privacy of our visitors is extremely important to us at <strong>Foodie Cooking</strong>, accessible from www.foodiecooking.com. This Privacy Policy document outlines the types of information that is collected and recorded by Foodie Cooking and how we use it.
                </Text>

                <Divider />

                {/* Section 1 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    1. Information We Collect
                  </Heading>
                  <Text mb={4}>
                    We collect information in two main ways:
                  </Text>

                  <Heading as="h3" size="md" color="#5c1605ff" mb={3}>
                    a. Information You Voluntarily Submit
                  </Heading>
                  <UnorderedList spacing={2} pl={4} mb={4}>
                    <ListItem>
                      <strong>Comments:</strong> When you leave comments, we collect the data shown in the comments form, your IP address, and browser user agent string to help spam detection.
                    </ListItem>
                    <ListItem>
                      <strong>Contact Forms/Email:</strong> When you use our contact form or email us directly, we collect your name and email address to respond to your inquiry.
                    </ListItem>
                    <ListItem>
                      <strong>Subscription/Newsletter:</strong> If you subscribe to our newsletter, we collect your email address and, optionally, your first name.
                    </ListItem>
                  </UnorderedList>

                  <Heading as="h3" size="md" color="#5c1605ff" mb={3}>
                    b. Information Collected Automatically (Cookies and Tracking)
                  </Heading>
                  <Text mb={3}>
                    Like many other websites, Foodie Cooking uses 'cookies.' These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                  </Text>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>
                      <strong>Log Files:</strong> We use log files (which record IP addresses, browser type, ISP, date/time stamp, referring/exit pages) to analyze trends and track users' movement on the site.
                    </ListItem>
                    <ListItem>
                      <strong>Analytics (e.g., Google Analytics):</strong> This service tracks website usage and provides us with information such as referring websites and user actions on the website. Google Analytics may capture your IP address, but no other personal information is captured by Google Analytics.
                    </ListItem>
                  </UnorderedList>
                </Box>

                <Divider />

                {/* Section 2 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    2. How We Use Your Information
                  </Heading>
                  <Text mb={3}>
                    We use the information we collect for the following purposes:
                  </Text>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>To operate, maintain, and improve our website and content.</ListItem>
                    <ListItem>To personalize your experience and remember your preferences.</ListItem>
                    <ListItem>To send you our newsletter and promotional information (if you opt-in).</ListItem>
                    <ListItem>To communicate with you, including customer service and responding to your inquiries.</ListItem>
                    <ListItem>To detect and prevent fraudulent transactions and protect against spam.</ListItem>
                  </UnorderedList>
                </Box>

                <Divider />

                {/* Section 3 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    3. Disclosure of Your Information
                  </Heading>
                  <Text mb={4}>
                    We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                  </Text>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>
                      <strong>Third-Party Service Providers:</strong> We use third-party providers for services such as email delivery (e.g., MailChimp/ConvertKit), website analytics, and comment spam checking (e.g., Akismet).
                    </ListItem>
                    <ListItem>
                      <strong>Advertising:</strong> We may use third-party advertising companies to serve content and advertisements when you visit the website, which may use cookies as described above.
                    </ListItem>
                    <ListItem>
                      <strong>Affiliate Links:</strong> We participate in affiliate marketing programs. If you click on an affiliate link and make a purchase, the merchant (not Foodie Cooking) may share anonymized transaction data with us.
                    </ListItem>
                  </UnorderedList>
                </Box>

                <Divider />

                {/* Section 4 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    4. Children's Information (COPPA)
                  </Heading>
                  <Text>
                    Foodie Cooking does not knowingly collect any Personally Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best to promptly remove such information from our records.
                  </Text>
                </Box>

                <Divider />

                {/* Section 5 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    5. Compliance with Global Privacy Laws
                  </Heading>
                  <Box bg="orange.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="#d35a3c" mb={4}>
                    <Text fontWeight="bold">
                      GDPR and CCPA: If you are a resident of the European Economic Area (EEA) or California, you may have specific additional rights regarding your data. We aim to comply with all relevant regulations. You have the right to request access to your data, request deletion, or restrict processing of your personal data.
                    </Text>
                  </Box>
                  <Text>
                    To exercise any of these rights, please contact us using the details below.
                  </Text>
                </Box>

                <Divider />

                {/* Section 6 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    6. Changes to This Privacy Policy
                  </Heading>
                  <Text>
                    We reserve the right to amend this Privacy Policy at any time. When we do, we will revise the "Last Updated" date at the top of this page. Your continued use of the website after any modification indicates your acceptance of the revised Privacy Policy.
                  </Text>
                </Box>

                <Divider />

                {/* Section 7 */}
                <Box>
                  <Heading as="h2" size="lg" color="#d35a3c" mb={4}>
                    7. Contact Us
                  </Heading>
                  <Text mb={3}>
                    If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us.
                  </Text>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>
                      By email: hello@foodiecooking.com
                    </ListItem>
                    <ListItem>
                      By mail: 123 Culinary Street, Food City, FC 12345
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
