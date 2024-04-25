import { Heading, Stack } from "@chakra-ui/react";
import { SingleSelectionFilter } from "lib/components/Filter/SingleSelectionFilter";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { StartupList } from "lib/components/StartupList/StartupList";
import { useCompanies } from "lib/hooks/useCompanies";
import useGuard from "lib/modules/routing/useGuard";
import { categorizeStartups } from "lib/modules/utils/shared";
import { NextPageWithLayout } from "pages/_app";
import React, { useMemo } from "react";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";

export const Startups: NextPageWithLayout = () => {
  const { isLoading } = useGuard(true, "/landing");
  const [startups, setStartups] = React.useState<
    Database.CategorizedStartupsType[] | null
  >(null);

  const { filter, filteredCompanies, setFilter } = useCompanies();
  useMemo(() => {
    setStartups(
      categorizeStartups(filteredCompanies.filter((s) => s.type === "startup"))
    );
  }, [filteredCompanies]);

  if (isLoading || !startups) return <Loading />;
  return (
    <Stack>
      <Heading size="md">Rockethub Startups</Heading>
      <SingleSelectionFilter
        label={filter}
        defaultValue={"Active startups"}
        values={["Active startups", "Inactive startups"]}
        setFilter={setFilter}
      />
      <StartupList categorizedStartups={startups} />
    </Stack>
  );
};

Startups.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};
