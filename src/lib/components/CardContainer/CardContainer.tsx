import { Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const CardContainer: React.FC = ({ children }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  return (
    <Stack bg={bgColor} p={7} borderRadius="xl" spacing={3} boxShadow="md">
      {children}
    </Stack>
  );
};

export default CardContainer;
