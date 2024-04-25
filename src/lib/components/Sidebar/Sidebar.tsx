import { Box, Divider, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { useUser } from "lib/hooks/useUser";
import React from "react";
import { DashboardSelect } from "../DashboardSelect";
import { PageWrapper } from "../layout/PageWrapper";
import { CompanyInfo } from "../SidebarHeader/CompanyInfo";
import UserInfo from "../SidebarHeader/UserInfo";

interface Props {
  children: React.ReactNode;
}

export const Sidebar: React.FC<Props> = ({ children }) => {
  const bgColor = useColorModeValue("white", "gray.700");

  const { user } = useUser();

  return (
    <Flex direction="row" h="100vh">
      <Flex
        minW={["90px", "90px", "90px", "350px"]}
        maxW={["90px", "90px", "90px", "350px"]}
        bg={bgColor}
        justifyContent="space-between"
        flexDirection="column"
        py={5}
      >
        <Stack spacing={4} overflow="auto" px={5}>
          <CompanyInfo />
          <Divider />
          <DashboardSelect />
        </Stack>
        <Box px={5}>{user && <UserInfo />}</Box>
      </Flex>
      <PageWrapper>{children}</PageWrapper>
    </Flex>
  );
};
