import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Database } from "../../../../shared/types";
import { MemberCell } from "./MemberCell";

interface Props {
  members: Database.UserType[] | null;
  companies: Database.CompanyType[] | null;
}

export const MembersList: React.FC<Props> = ({ members, companies }) => {
  return (
    <SimpleGrid spacing={4} columns={[1, 2, 4, 3, 4, 6]}>
      {members?.map((member) => (
        <MemberCell
          key={member.id}
          member={member}
          companyName={companies?.find((c) => c.id === member.companyId)?.name}
        />
      ))}
    </SimpleGrid>
  );
};
