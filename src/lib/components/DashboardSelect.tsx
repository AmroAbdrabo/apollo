import { Flex, HStack, Stack, Tag, Text, useColorMode } from "@chakra-ui/react";
import { useApplications } from "lib/hooks/useApplications";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiBuildings } from "react-icons/bi";
import {
  MdGroup,
  MdNotifications,
  MdOutlineContentPaste,
  MdOutlineVolunteerActivism,
  MdPersonAdd,
  MdSensorDoor,
  MdSpaceDashboard,
  MdSupport,
} from "react-icons/md";

interface DashboardFieldProps {
  title: string;
  route: string;
  icon: React.ReactElement;
  tagLabel?: string | number;
}

const DashboardField: React.FC<DashboardFieldProps> = ({
  title,
  route,
  icon,
  tagLabel,
}) => {
  // router hook
  const router = useRouter();
  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";

  const selectedColor = lightMode ? "#F9F9F9" : "gray.800";
  const defaultColor = lightMode ? "#FFFFFF" : "gray.700";

  return (
    <Link href={route} passHref>
      <HStack
        padding={4}
        borderRadius={10}
        bg={router.pathname === route ? selectedColor : defaultColor}
        cursor="pointer"
      >
        {icon}
        <Flex
          justifyContent="space-between"
          display={["none", "none", "none", "flex"]}
          flex={1}
        >
          <Text>{title}</Text>
          {tagLabel && <Tag>{tagLabel}</Tag>}
        </Flex>
      </HStack>
    </Link>
  );
};

export const DashboardSelect: React.FC = () => {
  const { userGroup } = useAuth();
  const isAdmin = userGroup === "admin";
  const isStartup = userGroup === "startup";
  const isSupporter = userGroup === "supporter";

  const internal = isStartup || isAdmin;

  const { newApplications } = useApplications();

  return (
    <Stack direction="column" spacing={3} pb={3}>
      <DashboardField icon={<MdNotifications />} title="Inbox" route="/inbox" />
      <DashboardField
        icon={<MdSpaceDashboard />}
        title="Dashboard"
        route="/dashboard"
      />
      {isAdmin && (
        <Stack spacing={3}>
          <DashboardField
            icon={<BiBuildings />}
            title="Rockethub Startups"
            route="/startups"
          />
          <DashboardField
            icon={<MdPersonAdd />}
            title="Applications"
            route="/applications"
            tagLabel={
              newApplications.length > 0 ? newApplications.length : undefined
            }
          />
        </Stack>
      )}
      {internal && (
        <DashboardField icon={<MdGroup />} title="Members" route="/members" />
      )}
      {(internal || isSupporter) && (
        <DashboardField
          icon={<MdSupport />}
          title="Supporters Program"
          route="/supporters"
        />
      )}
      {internal && (
        <DashboardField
          icon={<MdOutlineVolunteerActivism />}
          title="Mentorship Program"
          route="/mentors"
        />
      )}
      {internal && (
        <DashboardField
          icon={<MdSensorDoor />}
          title="Room Booking"
          route="/roombooking"
        />
      )}
      {isStartup && (
        <DashboardField
          icon={<MdOutlineContentPaste />}
          title="Contract"
          route="/contract"
        />
      )}
    </Stack>
  );
};
