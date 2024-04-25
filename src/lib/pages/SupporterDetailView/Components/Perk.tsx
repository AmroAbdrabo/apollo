import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  description: string;
  lightMode: boolean;
  deletePerk: () => void;
}

export const Perk: React.FC<Props> = ({
  title,
  description,
  lightMode,
  deletePerk,
}) => {
  return (
    <Flex
      bg={lightMode ? "#EDF2F7" : "gray.700"}
      padding={3}
      borderRadius={10}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Heading size="sm">{title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Flex
        alignItems="center"
        justifyContent="center"
        color="white"
        fontSize={20}
        cursor="pointer"
        w="30px"
        h="30px"
        bg="red.400"
        borderRadius="100%"
        _hover={{
          background: "red.500",
        }}
        onClick={deletePerk}
      >
        <CloseIcon w={3} />
      </Flex>
    </Flex>
  );
};
