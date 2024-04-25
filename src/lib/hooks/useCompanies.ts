import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "lib/modules/firebase/firestore";
import { useMemo, useState } from "react";

export const useCompanies = () => {
  const { data, isLoading, refetch } = useQuery(["companies"], getCompanies);

  //TODO @dennis: fix default value
  const [filter, setFilter] = useState<string>("Active startups");

  const filtered = useMemo(() => {
    if (!data) return [];
    if (filter === "Active startups") {
      return data?.filter((application) => application.status === "active");
    }
    if (filter === "Inactive startups") {
      return data?.filter((application) => application.status === "inactive");
    }
    return data?.filter(
      (application) =>
        application.status === "active" || application.status === "inactive"
    );
  }, [data, filter]);

  return {
    filter,
    setFilter,
    companies: data ?? [],
    filteredCompanies: filtered,
    isLoadingCompanies: isLoading,
    refetchCompanies: refetch,
  };
};
