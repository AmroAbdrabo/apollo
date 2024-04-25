import { Heading, Stack } from "@chakra-ui/react";
import { MemberFilter } from "lib/components/MemberFilter/MemberFilter";
import { MembersList } from "lib/components/MembersList/MembersList";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { useCompanies } from "lib/hooks/useCompanies";
import useGuard from "lib/modules/routing/useGuard";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";

function filterMembers(filter: string, members: Database.UserType[]) {
  if (!filter) return members;

  return members.filter((member) => {
    return (
      member.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      member.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      member.position.toLowerCase().includes(filter.toLowerCase())
    );
  });
}

const Members = () => {
  const { users } = useAppSelector(generalSelector);
  const { companies } = useCompanies();
  const { isLoading } = useGuard(true, "/landing");
  const [filter, setFilter] = useState("");
  const [members, setMembers] = useState<Database.UserType[] | null>(null);

  const [filteredMembers, setFilteredMembers] = useState<
    Database.UserType[] | null
  >(null);

  useEffect(() => {
    setMembers(users);
  }, [users, companies]);

  useEffect(() => {
    if (members) {
      setFilteredMembers(filterMembers(filter, members));
    }
  }, [filter, members]);

  if (isLoading || !members || !companies) return <Loading />;

  return (
    <Stack>
      <Heading size="md">Members</Heading>
      <MemberFilter filter={filter} setFilter={setFilter} />
      <MembersList members={filteredMembers} companies={companies} />
    </Stack>
  );
};

Members.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default Members;
