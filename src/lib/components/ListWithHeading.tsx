import { Heading, Stack, Wrap } from "@chakra-ui/react";
import React from "react";

interface Props {
  heading: string;
  children: React.ReactNode;
}

export const ListWithHeading: React.FC<Props> = ({ heading, children }) => {
  return (
    <Stack spacing={4}>
      <Heading fontSize="lg">{heading}</Heading>
      <Wrap spacing={4} direction="row" w="99%">
        {children}
      </Wrap>
    </Stack>
  );
};
