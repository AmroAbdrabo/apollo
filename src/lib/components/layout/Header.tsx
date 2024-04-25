import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Box margin="0 auto" maxW={1400} padding="20px 50px" bg="blue.300">
      <Flex as="footer" width="full" direction="column">
        <Heading as="h1" size="md">
          <Link href="/">RocketHub</Link>
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
