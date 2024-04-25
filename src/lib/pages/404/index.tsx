import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import MotionBox from "lib/components/motion/Box";
import Link from "next/link";

interface Props {
  title?: string;
  recoverUrl?: string;
}

const Page404: React.FC<Props> = ({ title, recoverUrl }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image
          src="/404 Error-pana.svg"
          alt="Error 404 not found Illustration"
        />
      </MotionBox>

      <Box marginY={4}>
        <Heading textAlign="center">{title ?? "Page not Found."}</Heading>

        <Box textAlign="center" marginTop={4}>
          <Link href={recoverUrl ?? "/dashboard"} passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            >
              Let&apos;s Head Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page404;
