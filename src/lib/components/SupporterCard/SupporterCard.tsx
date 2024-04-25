import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Database } from "../../../../shared/types";
import SupporterMetric from "./SupporterMetric";

interface Props {
  supporter: Database.SupporterType;
}

const SupporterCard: React.FC<Props> = ({ supporter }) => {
  const { name, category, imageSource, perks, id, isNew } = supporter;
  const bgColor = useColorModeValue("white", "gray.700");

  const router = useRouter();

  const navigateToDetailView = useCallback(() => {
    router.push(`/supporter/${id}`);
  }, [router, id]);

  return (
    <Box
      pos="relative"
      p={10}
      w="full"
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
      onClick={navigateToDetailView}
      cursor="pointer"
    >
      {isNew && (
        <Center pos="absolute" top={2.5} right={0} left={0}>
          <Tag colorScheme="teal">New</Tag>
        </Center>
      )}
      <Center h="full">
        <VStack spacing={8}>
          <Box textAlign="center">
            <Heading size="sm">{name}</Heading>
            <Text>{category}</Text>
          </Box>
          <Avatar
            boxSize="150px"
            borderRadius="lg"
            name={name}
            src={imageSource}
            bg="white"
            boxShadow="base"
          />
          <HStack spacing={6}>
            {/* <SupporterMetric name="Usage" value={0} /> */}
            <SupporterMetric name="Perks" value={perks.length} />
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default SupporterCard;
