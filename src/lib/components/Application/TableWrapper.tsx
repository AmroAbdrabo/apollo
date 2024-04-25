import { Box, Divider, Heading, Table, Tbody } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const TableWrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <Box borderRadius="lg" p="20px 0px" boxShadow="md">
      <Heading size="md" mx="20px">
        {title}
      </Heading>
      <Divider mt="3" />
      <Table variant="simple">
        <Tbody>{children}</Tbody>
      </Table>
    </Box>
  );
};
