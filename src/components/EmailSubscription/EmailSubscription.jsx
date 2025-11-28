import React from 'react';
import { Box, Container } from '@chakra-ui/react';

const EmailSubscription = () => {
  return (
    <Box py={8} px={4}>
      <Container maxW="container.xl">
        <Box
          borderRadius="md"
          overflow="hidden"
          boxShadow="lg"
        >
          <iframe
            aria-label="Email Subscription"
            frameBorder="0"
            style={{
              height: '500px',
              width: '100%',
              border: 'none'
            }}
            src="https://4a3f99e4.sibforms.com/serve/MUIFAHOlz2C86nX1kSBw4GcA25v-t-2yE-MCGC049B5LS52_kYbdgvcWI3itxnAEjbKezF7LGsMKT-FihDVLf5dATj5ksVPbcaOG_2R0WzrjXTGj33jc2mc9ZmuS3fDQWozIZMahJksmn1GQxFQldzY_ZnFs9Cwxi07dylhOHxC4UFH8TI_NTWYdchddT9H35uQuxYa0Nizf_-fRPA=="
            title="Email Subscription Form"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default EmailSubscription;
