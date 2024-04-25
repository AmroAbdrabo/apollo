import { Center, Heading, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  value: number;
}

const SupporterMetric: React.FC<Props> = ({ name, value }) => {
  return (
    <Center flexDir="column">
      <Text fontSize="sm" variant="secondary">
        {name}
      </Text>
      <Heading fontSize="2xl">{value}</Heading>
    </Center>
  );
};

export default SupporterMetric;
