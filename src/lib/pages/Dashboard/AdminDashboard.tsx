import { Stack } from "@chakra-ui/react";
import { useApplications } from "lib/hooks/useApplications";
import { EventsList } from "lib/components/EventsList/EventsList";
import { Metric } from "lib/components/MetricsList/Metric";
import { MetricsList } from "lib/components/MetricsList/MetricsList";
import { TeamList } from "lib/components/TeamList/TeamList";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import { useRouter } from "next/router";
import React from "react";
import { BiBuildings } from "react-icons/bi";
import {
  MdGroup,
  MdOutlineVolunteerActivism,
  MdPersonAdd,
  MdSupport,
} from "react-icons/md";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { useCompanies } from "lib/hooks/useCompanies";

export const AdminDashboard: React.FC = () => {
  const router = useRouter();

  const { users, supporters, events, mentors } =
    useAppSelector(generalSelector);

  const { companies } = useCompanies();
  const { userCompanyId } = useAuth();

  const { newApplications } = useApplications();

  return (
    <Stack w="full" h="full" spacing={5}>
      <TeamList
        members={users.filter((member) => member.companyId === userCompanyId)}
      />
      <MetricsList>
        <Metric
          metric="Startups"
          value={
            companies.filter(
              (s) => s.type === "startup" && s.status === "active"
            ).length
          }
          icon={<BiBuildings color="teal" size={20} />}
          onClick={() => router.push("/startups")}
        />
        <Metric
          metric="Supporters"
          value={supporters.length}
          icon={<MdSupport color="teal" size={20} />}
          onClick={() => router.push("/supporters")}
        />
        <Metric
          metric="Mentors"
          value={mentors.length}
          icon={<MdOutlineVolunteerActivism color="teal" size={20} />}
          onClick={() => router.push("/mentors")}
        />
        <Metric
          metric="Members"
          value={users.length}
          icon={<MdGroup color="teal" size={20} />}
          onClick={() => router.push("/members")}
        />
        <Metric
          metric="Applications"
          value={newApplications.length}
          icon={<MdPersonAdd color="teal" size={20} />}
          onClick={() => router.push("/applications")}
        />
      </MetricsList>
      <EventsList events={events} />
    </Stack>
  );
};
