import {
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  metric: string;
  value: number;
  icon: React.ReactElement;
  onClick?: () => void;
}

export const Metric: React.FC<Props> = ({ metric, value, icon, onClick }) => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <HStack
      direction="row"
      bgColor={bgColor}
      padding="30px"
      borderRadius="lg"
      spacing="15px"
      cursor={onClick ? "pointer" : "default"}
      onClick={onClick}
      minW="200px"
      boxShadow="md"
    >
      <Center padding="15px" borderRadius="100%" bgColor="teal.50" color="teal">
        {icon}
      </Center>

      <Flex direction="column">
        <Text variant="secondary" fontSize="sm">
          {metric}
        </Text>
        <Heading size="lg">{value}</Heading>
      </Flex>
    </HStack>
  );
};
