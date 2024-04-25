import { Heading, Stack, Wrap } from "@chakra-ui/react";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

export const MetricsList: React.FC<Props> = ({ children }) => {
  return (
    <Stack>
      <Heading size="md">Overview</Heading>
      <Wrap direction="row" w="99%">
        {children}
      </Wrap>
    </Stack>
  );
};
