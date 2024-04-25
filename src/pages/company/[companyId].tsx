import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { StartupDetailView } from "lib/pages/StartupDetailView/StartupDetailView";
import React from "react";

export default function Startup() {
  return <StartupDetailView />;
}

Startup.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};
