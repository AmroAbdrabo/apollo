import { Sidebar } from "lib/components/Sidebar/Sidebar";
import useGuard from "lib/modules/routing/useGuard";
import { NextPageWithLayout } from "pages/_app";
import React from "react";

const CleaningSchedule: NextPageWithLayout = () => {
  // guarded route -> redirect to /login if authentication is missing
  useGuard(true, "/landing");

  return <span>CleaningSchedule</span>;
};

CleaningSchedule.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default CleaningSchedule;
