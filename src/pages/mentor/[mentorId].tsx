import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { MentorDetailView } from "lib/pages/MentorDetailView/MentorDetailView";
import React from "react";

export default function Mentor() {
  return <MentorDetailView />;
}

Mentor.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};
