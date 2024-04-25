import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Database } from "../../../../shared/types";
import { MentorCell } from "./MentorCell";

interface Props {
  mentors: Database.MentorType[] | null;
}

export const MentorsList: React.FC<Props> = ({ mentors }) => {
  return (
    <SimpleGrid minChildWidth="250px" spacing={3}>
      {mentors?.map((mentor) => (
        <MentorCell key={mentor.id} mentor={mentor} />
      ))}
    </SimpleGrid>
  );
};
