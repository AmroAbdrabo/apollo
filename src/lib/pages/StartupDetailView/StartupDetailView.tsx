import { SimpleGrid, Stack } from "@chakra-ui/react";
import CompanyHeader from "lib/components/CompanyHeader/CompanyHeader";
import ContractCard from "lib/components/ContractCard/ContractCard";
import DeleteCard from "lib/components/DeleteCard/DeleteCard";
import MissionStatement from "lib/components/MissionStatement/MissionStatement";
import { PageHeader } from "lib/components/PageHeader/PageHeader";
import TeamCard from "lib/components/TeamCard/TeamCard";
import VideoPitch from "lib/components/VideoPitch/VideoPitch";
import { useCompanies } from "lib/hooks/useCompanies";
import useAPI from "lib/hooks/useAPI";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";

export const StartupDetailView = () => {
  const router = useRouter();
  const [company, setCompany] = useState<Database.CompanyType>();
  const [team, setTeam] = useState<Database.UserType[]>([]);
  const { companyId } = router.query;

  const { users } = useAppSelector(generalSelector);

  const { companies, refetchCompanies } = useCompanies();

  const { userGroup } = useAuth();

  const { disableUsers } = useAPI();

  useEffect(() => {
    if (companyId && companies && users) {
      const foundCompany = companies.find((c) => c.id === companyId);
      const foundTeam = users.filter((m) => m.companyId === companyId);
      setCompany(foundCompany);
      setTeam(foundTeam);
    }
  }, [companyId, companies, users]);

  const onDelete = useCallback(async () => {
    const foundUsers = users.filter((m) => m.companyId === companyId);
    const foundUserIds = foundUsers.map((u) => u.id);
    await disableUsers(foundUserIds);
    await refetchCompanies();
    router.back();
  }, [router, refetchCompanies, users, disableUsers, companyId]);

  if (!company || !team) return <Loading />;

  const showDelete = userGroup === "admin" && company.status === "active";

  return (
    <Stack w="full" h="full" spacing={4}>
      <PageHeader title="" route={() => router.back()} />
      <CompanyHeader company={company} />
      <SimpleGrid columns={[1, 1, 1, 1, 2, 3]} spacing={5}>
        <VideoPitch company={company} />
        <MissionStatement companyId={company.id} />
        <TeamCard team={team} />
        <ContractCard company={company} />
        {showDelete && <DeleteCard company={company} onDelete={onDelete} />}
      </SimpleGrid>
    </Stack>
  );
};
