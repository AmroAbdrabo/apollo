import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { SupporterDetailView } from "lib/pages/SupporterDetailView/SupporterDetailView";
import React from "react";

export default function Supporter() {
  return <SupporterDetailView />;
}

Supporter.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};
