import { useQuery } from "@tanstack/react-query";
import { getCompanyById } from "lib/modules/firebase/firestore";

export const useCompanyById = (companyId: string | undefined) => {
  const { data, isLoading, refetch } = useQuery(
    ["companyById", companyId],
    () => getCompanyById(companyId)
  );

  return {
    company: data,
    isLoadingCompany: isLoading,
    refetchCompany: refetch,
  };
};
