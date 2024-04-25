import { SimpleGrid, Stack } from "@chakra-ui/react";
import { EventsList } from "lib/components/EventsList/EventsList";
import { Metric } from "lib/components/MetricsList/Metric";
import { MetricsList } from "lib/components/MetricsList/MetricsList";
import MissionStatement from "lib/components/MissionStatement/MissionStatement";
import TeamCard from "lib/components/TeamCard/TeamCard";
import VideoPitch from "lib/components/VideoPitch/VideoPitch";
import { useUserCompany } from "lib/hooks/useUserCompany";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineVolunteerActivism, MdSupport } from "react-icons/md";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";

export const StartupDashboard: React.FC = () => {
  const { supporters, events, mentors, users } =
    useAppSelector(generalSelector);
  const { company } = useUserCompany();

  const router = useRouter();

  return (
    <Stack maxW="full" spacing={5}>
      <MetricsList>
        <Metric
          metric="Supporters"
          value={supporters.length}
          icon={<MdSupport />}
          onClick={() => router.push("/supporters")}
        />
        <Metric
          metric="Mentors"
          value={mentors.length}
          icon={<MdOutlineVolunteerActivism />}
          onClick={() => router.push("/mentors")}
        />
      </MetricsList>
      <SimpleGrid columns={[1, 1, 1, 1, 2, 3]} spacing={5}>
        <VideoPitch company={company} />
        {company && <MissionStatement companyId={company?.id} />}
        <TeamCard
          team={users ? users.filter((u) => u.companyId === company?.id) : []}
        />
      </SimpleGrid>
      <EventsList events={events} />
    </Stack>
  );
};
