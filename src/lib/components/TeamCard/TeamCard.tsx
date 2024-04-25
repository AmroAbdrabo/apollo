import { Heading, SimpleGrid } from "@chakra-ui/react";
import { Database } from "../../../../shared/types";
import CardContainer from "../CardContainer/CardContainer";
import TeamMember, { AddTeamMember } from "./TeamMember";

interface Props {
  team: Database.UserType[];
}

// TODO @dennis: currently one only can invite to own company, admin should be able to invite people into other companies as well

const TeamCard: React.FC<Props> = ({ team }) => {
  if (!team) return null;
  const missingTeam = Array.from(Array(6 - team.length).keys());
  return (
    <CardContainer>
      <Heading size="sm">Team</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={3} h="full" w="full">
        {team?.map((user) => {
          return <TeamMember key={user.id} member={user} />;
        })}
        {missingTeam?.map((number) => {
          return <AddTeamMember key={number} />;
        })}
      </SimpleGrid>
    </CardContainer>
  );
};

export default TeamCard;
