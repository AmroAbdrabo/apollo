import { useQuery } from "@tanstack/react-query";
import { getCompanyById } from "lib/modules/firebase/firestore";
import { useUser } from "./useUser";

export const useUserCompany = () => {
  const { user } = useUser();

  const { data, isLoading, refetch } = useQuery(
    ["companyById", user?.companyId],
    () => getCompanyById(user?.companyId)
  );

  return {
    user: user,
    company: data,
    isLoadingCompany: isLoading,
    refetchCompany: refetch,
  };
};
