import { useQuery } from "@tanstack/react-query";
import { getApplicationsWithStatus } from "lib/modules/firebase/firestore";
import { useMemo, useState } from "react";

export const useApplications = () => {
  const { data, isLoading, refetch } = useQuery(
    ["applications"],
    getApplicationsWithStatus
  );

  //TODO @dennis: fix default value
  const [filter, setFilter] = useState<string>("Open applications");

  const filtered = useMemo(() => {
    if (!data) return [];
    if (filter === "Open applications") {
      return data?.filter((application) => application.status === "applied");
    }
    if (filter === "Rejected applications") {
      return data?.filter((application) => application.status === "rejected");
    }
    return data?.filter(
      (application) =>
        application.status === "applied" || application.status === "rejected"
    );
  }, [data, filter]);

  const newApplications = useMemo(() => {
    if (!data) return [];
    return data?.filter((application) => application.status === "applied");
  }, [data]);

  return {
    filter,
    setFilter,
    applications: data,
    newApplications,
    filteredApplications: filtered,
    isLoadingApplications: isLoading,
    refetchApplications: refetch,
  };
};
