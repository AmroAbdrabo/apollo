import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { StartupDetailView } from "lib/pages/StartupDetailView/StartupDetailView";
import React from "react";

export default function Application() {
  return <StartupDetailView />;
}

Application.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};
