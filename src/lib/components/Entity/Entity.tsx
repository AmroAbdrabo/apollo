import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  imageUrl?: string;
  title: string;
  sublabel?: string;
  shrink?: boolean;
}

const Entity: React.FC<Props> = ({ imageUrl, title, sublabel, shrink }) => {
  return (
    <HStack spacing={4}>
      <Avatar
        src={imageUrl}
        name={title}
        borderRadius="md"
        size="sm"
        boxShadow="md"
      />
      <Flex
        justifyContent="center"
        direction="column"
        display={shrink ? ["none", "none", "none", "flex"] : "flex"}
      >
        <Text fontSize="md" fontWeight="medium">
          {title}
        </Text>
        {sublabel && (
          <Text variant="secondary" fontSize="sm" noOfLines={1}>
            {sublabel}
          </Text>
        )}
      </Flex>
    </HStack>
  );
};

export default Entity;
