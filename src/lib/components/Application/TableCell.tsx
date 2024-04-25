import { Td, Tr } from "@chakra-ui/react";
import React from "react";

interface Props {
  name: string;
  value: string;
}

export const TableCell: React.FC<Props> = ({ name, value }) => {
  return (
    <Tr>
      <Td color="gray.500">{name}</Td>
      <Td isNumeric>{value}</Td>
    </Tr>
  );
};
