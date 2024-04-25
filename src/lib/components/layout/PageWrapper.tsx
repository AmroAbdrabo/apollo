import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Box
      w="full"
      p={6}
      overflow="auto"
      bg={useColorModeValue("#F9F9F9", "gary.800")}
    >
      <Box w="full" maxW="1440px" mx="auto">
        {children}
      </Box>
    </Box>
  );
};
