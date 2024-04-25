import { Center, Heading, Image, VStack } from "@chakra-ui/react";
import MotionBox from "lib/components/motion/Box";

interface Props {
  title: string;
}

const Empty: React.FC<Props> = ({ title }) => {
  return (
    <Center w="full" h="full">
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        w="70%"
      >
        <VStack spacing={3}>
          <Image src="/empty.svg" alt="Empty" />
          <Heading size="md" textAlign="center">
            {title}
          </Heading>
        </VStack>
      </MotionBox>
    </Center>
  );
};

export default Empty;
