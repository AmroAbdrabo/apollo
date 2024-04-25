import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
} from "@chakra-ui/react";

interface Props {
  timestamp: number;
  category: string;
  title: string;
  authorImageUrl: string;
  authorName: string;
}

const Notification: React.FC<Props> = ({
  timestamp,
  category,
  title,
  authorImageUrl,
  authorName,
  children,
}) => {
  return (
    <Box
      px={8}
      py={4}
      rounded="lg"
      boxShadow="md"
      bg="white"
      _dark={{
        bg: "gray.700",
      }}
      w="full"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="sm" variant="secondary">
          {new Date(timestamp).toDateString()}
        </Text>
        <Tag>{category}</Tag>
      </Flex>

      <Box>
        <Heading size="md">{title}</Heading>
        {children}
      </Box>

      <Flex justifyContent="flex-end" alignItems="center" mt={4}>
        <HStack>
          <Avatar size="sm" src={authorImageUrl} name={authorName} />
          <Text fontWeight={600}>{authorName}</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Notification;
