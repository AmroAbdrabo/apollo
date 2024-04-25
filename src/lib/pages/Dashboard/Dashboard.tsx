import { Box } from "@chakra-ui/react";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import useGuard from "lib/modules/routing/useGuard";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { Loading } from "../Loading/Loading";
import { StartupDashboard } from "../StartupDashboard/StartupDashboard";
import { AdminDashboard } from "./AdminDashboard";

const Dashboard: NextPageWithLayout = () => {
  const { isLoading } = useGuard(true, "/landing");
  const { userGroup } = useAuth();

  if (isLoading) return <Loading />;

  return (
    <Box w="full">
      {userGroup === "admin" && <AdminDashboard />}
      {userGroup !== "admin" && <StartupDashboard />}
    </Box>
  );
};

Dashboard.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default Dashboard;
