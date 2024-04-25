import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";

interface Props {
  onClick: () => void;
}

export const DeleteButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Flex
      pos="absolute"
      top="10px"
      right="10px"
      alignItems="center"
      justifyContent="center"
      color="white"
      fontSize={20}
      w="35px"
      h="35px"
      cursor="pointer"
      bg="red.400"
      borderRadius="100%"
      zIndex={10}
      _hover={{
        background: "red.500",
      }}
      onClick={onClick}
    >
      <DeleteIcon w={4} />
    </Flex>
  );
};
