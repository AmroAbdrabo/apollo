import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Empty from "lib/components/Empty/Empty";

import { useApplications } from "lib/hooks/useApplications";
import { SingleSelectionFilter } from "lib/components/Filter/SingleSelectionFilter";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import useGuard from "lib/modules/routing/useGuard";
import { formatDate } from "lib/modules/utils/shared";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { Loading } from "../Loading/Loading";

const Applications: NextPageWithLayout = () => {
  const { isLoading } = useGuard(true, "/landing");
  const router = useRouter();

  const { filter, filteredApplications, setFilter, isLoadingApplications } =
    useApplications();

  const navigateToDetailView = (id: string | undefined) => {
    router.push(`/applicationdetails?applicationId=${id}`);
  };

  if (isLoading || isLoadingApplications) return <Loading />;

  return (
    <Stack>
      <Heading size="md" pb={5}>
        Applications
      </Heading>
      <SingleSelectionFilter
        label={filter}
        defaultValue="Open applications"
        values={[
          "Open applications",
          "Rejected applications",
          "All applications",
        ]}
        setFilter={setFilter}
      />
      {filteredApplications.length === 0 && <Empty title="No Applications" />}
      {filteredApplications.length !== 0 && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th> Startup Name </Th>
                <Th> Submission Date </Th>
                <Th> Startup Category </Th>
                <Th> Website </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredApplications.map((application) => (
                <Tr
                  key={application.id}
                  _hover={{ color: "teal" }}
                  cursor="pointer"
                >
                  <Td
                    onClick={() => {
                      navigateToDetailView(application.id);
                    }}
                  >
                    <Text width="fit-content" className="peer">
                      {application.startup.name || "N/A"}
                    </Text>
                  </Td>
                  <Td
                    onClick={() => {
                      navigateToDetailView(application.id);
                    }}
                  >
                    {(application.submissionDate &&
                      formatDate(application.submissionDate)) ||
                      "N/A"}
                  </Td>
                  <Td
                    onClick={() => {
                      navigateToDetailView(application.id);
                    }}
                  >
                    {application.startup.category || "N/A"}
                  </Td>
                  <Td>
                    <Link
                      href={
                        application.startup?.website.includes("https")
                          ? application.startup.website
                          : `https://${application.startup?.website}`
                      }
                      target="_blank"
                    >
                      <Button rightIcon={<ExternalLinkIcon />}>Website</Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

Applications.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default Applications;
