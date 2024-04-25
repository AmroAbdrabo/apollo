import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  route: () => void;
}

export const PageHeader: React.FC<Props> = ({ title, route }) => {
  return (
    // If the user is on a small phone, we put the back button on top of the title such that the button is not behind the title
    <Flex
      direction={["column", "row"]}
      justify="center"
      pos="relative"
      align="center"
      minHeight="30px"
      mb="20px"
    >
      {/* If the user is on mobile, align the button to the start of the flex (flex-start), otherwise we use absolute positioning */}
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="blue"
        variant="ghost"
        onClick={route}
        alignSelf="flex-start"
        pos={["relative", "absolute"]}
        left={0}
      >
        Back
      </Button>
      <Heading size="md">{title}</Heading>
    </Flex>
  );
};
