import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { Database } from "../../../../shared/types";
import { AddTeamMember, TeamMember } from "./TeamMember";

interface Props {
  members: Database.UserType[];
}

export const TeamList: React.FC<Props> = ({ members }) => {
  return (
    <Flex direction="row">
      <Stack direction="row" spacing={5} overflow="auto">
        <AddTeamMember />
        {members.map((member) => (
          <TeamMember key={JSON.stringify(member)} member={member} />
        ))}
      </Stack>
    </Flex>
  );
};
