import { Box } from "@chakra-ui/react";
import Empty from "lib/components/Empty/Empty";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import useGuard from "lib/modules/routing/useGuard";
import React from "react";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { Loading } from "../Loading/Loading";

const Contract = () => {
  // guarded route -> redirect to /login if authentication is missing
  const { isLoading } = useGuard(true, "/landing");

  // redux
  const { contractURL } = useAppSelector(generalSelector);

  if (isLoading) return <Loading />;

  if (!contractURL) {
    return <Empty title="Contract not found. Please reach out to Operations" />;
  }

  return (
    <Box w="full" h="95vh">
      <iframe title="document" src={contractURL} width="100%" height="100%">
        Loading…
      </iframe>
    </Box>
  );
};

Contract.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default Contract;
