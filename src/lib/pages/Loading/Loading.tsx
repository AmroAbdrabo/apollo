import { Center, CircularProgress } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Center w="100%" h="100vh">
      <CircularProgress isIndeterminate color="green.300" />
    </Center>
  );
};
