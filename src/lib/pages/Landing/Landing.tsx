import {
  Button,
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Metric } from "lib/components/MetricsList/Metric";
import useGuard from "lib/modules/routing/useGuard";
import { useRouter } from "next/router";
import { BiBuildings } from "react-icons/bi";
import { FaPiggyBank } from "react-icons/fa";
import { MdOutlineVolunteerActivism, MdSupport } from "react-icons/md";
import { Loading } from "../Loading/Loading";

const Landing = () => {
  const router = useRouter();

  const { isLoading } = useGuard(false, "/dashboard");

  const navigateTo = (path: string) => {
    router.push(path);
  };

  if (isLoading) return <Loading />;

  return (
    <SimpleGrid
      minChildWidth="400px"
      w="100vw"
      h="100vh"
      spacing={10}
      maxWidth="7xl"
      mx="auto"
      px="5"
    >
      <Center p={10}>
        <Stack maxW="500px">
          <Heading>Let&#39;s build a better</Heading>
          <HStack>
            <Heading>tomorrow,</Heading>
            <Heading
              bgImage="https://cdn.devdojo.com/images/february2021/bg-colorful.jpg"
              bgPos="center"
              bgClip="text"
            >
              together.
            </Heading>
          </HStack>
          <Text fontSize="xl">
            Welcome to the Rockethub, a Startup Incubator run by the ETH
            Entrepreneur Club.
          </Text>
          <Text fontSize="xl">
            Our co-working space allows you to scale fast and opens up a network
            of supporters and mentors who are deeply rooted in the Swiss startup
            ecosystem.
          </Text>
          <HStack>
            <Button
              bgImage="https://cdn.devdojo.com/images/february2021/bg-colorful.jpg"
              bgPos="center"
              _hover={{
                transform: "scale(1.1)",
              }}
              onClick={() => navigateTo("/startupapplication")}
            >
              Apply
            </Button>
            <Button onClick={() => navigateTo("/redeem")}>Redeem</Button>
            <Button onClick={() => navigateTo("/login")}>Login</Button>
          </HStack>
        </Stack>
      </Center>
      <Center p={10} display={["none", "none", "none", "flex"]}>
        <VStack spacing={10}>
          {/* <Box>
            <Heading textAlign="center">Rockethub</Heading>
            <Text>by ETH Entrepreneur Club</Text>
          </Box> */}
          <SimpleGrid spacing={5} columns={2}>
            <Metric
              metric="Startups"
              value={20}
              icon={<BiBuildings color="teal" size={20} />}
            />
            <Metric
              metric="Supporters"
              value={17}
              icon={<MdSupport color="teal" size={20} />}
            />
            <Metric
              metric="Mentors"
              value={5}
              icon={<MdOutlineVolunteerActivism color="teal" size={20} />}
            />
            <Metric metric="VCs" value={3} icon={<FaPiggyBank />} />
          </SimpleGrid>
        </VStack>
      </Center>
    </SimpleGrid>
  );
};

export default Landing;
