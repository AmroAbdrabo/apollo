import { Center, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  title?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const ActionTile: React.FC<Props> = ({ children, onClick, title }) => {
  const bgColor = useColorModeValue("#FFFFFF", "gray.600");
  return (
    <VStack>
      <Center
        p={8}
        bg={bgColor}
        borderRadius="md"
        cursor="pointer"
        boxShadow="md"
        onClick={onClick}
        fontSize="2xl"
      >
        {children}
      </Center>
      <Text fontSize="sm">{title}</Text>
    </VStack>
  );
};
