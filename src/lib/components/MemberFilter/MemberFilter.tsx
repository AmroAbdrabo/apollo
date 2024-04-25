import { FormControl, FormHelperText, Input } from "@chakra-ui/react";
import React from "react";

interface Props {
  filter: string;
  setFilter: (filter: string) => void;
}

export const MemberFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <FormControl>
      <Input
        variant="filled"
        placeholder="Search"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <FormHelperText>Look up members and roles.</FormHelperText>
    </FormControl>
  );
};
