import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box margin="0 auto" maxW={1400} padding="0 50px" bg="green.300">
      <Flex as="footer" width="full" direction="column">
        <Text>Made with ❤ by ETH Entrepreneur Club</Text>
        <Text>© {new Date().getFullYear()} ETH Entrepreneur Club</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
