import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CompanyHeader from "lib/components/CompanyHeader/CompanyHeader";
import { ContactForm } from "lib/components/ContactForm";
import { PageHeader } from "lib/components/PageHeader/PageHeader";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import useGuard from "lib/modules/routing/useGuard";
import Page404 from "lib/pages/404";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";
import { EditSupporterDetailView } from "./EditSupporterDetailView";

export const SupporterDetailView: React.FC = () => {
  const { isLoading } = useGuard(true, "/landing");
  const [supporter, setSupporter] = useState<Database.SupporterType | null>();
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { supporterId } = router.query;
  const { supporters } = useAppSelector(generalSelector);

  const { userGroup } = useAuth();

  const perkBgColor = useColorModeValue("white", "gray.700");

  const isAdmin = userGroup === "admin";

  useEffect(() => {
    if (supporterId) {
      setSupporter(supporters.find((s) => s.id === supporterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, supporterId, supporters]);

  if (isLoading) return <Loading />;

  if (supporter)
    return (
      <Box w="full">
        {isEditMode && (
          <EditSupporterDetailView
            supporter={supporter}
            backToOverview={() => setIsEditMode(false)}
          />
        )}
        {!isEditMode && (
          <Stack w="full" h="full" spacing={10}>
            <PageHeader title="" route={() => router.back()} />
            <CompanyHeader company={supporter} />
            <Text>{supporter.desc}</Text>
            <Stack>
              <Heading size="md">Perks</Heading>
              {supporter?.perks?.map((perk) => (
                <Box
                  key={JSON.stringify(perk)}
                  p={5}
                  borderRadius="md"
                  bg={perkBgColor}
                  boxShadow="md"
                >
                  <Heading size="md">{perk.title}</Heading>
                  <Text>{perk.description}</Text>
                </Box>
              ))}
            </Stack>
            <Stack direction="row">
              {supporter?.publicEmail && (
                <ContactForm
                  email={supporter.publicEmail}
                  subject="Rockethub Startup Request"
                  label="Contact"
                />
              )}
              {supporter.privateEmail && isAdmin && (
                <ContactForm
                  email={supporter.privateEmail}
                  subject="ETH EC RocketHub Startup Supporter Request"
                  label="Operations Contact"
                />
              )}
              {supporter?.landingPage && (
                <Button>
                  <a href={supporter.landingPage}>Website</a>
                </Button>
              )}
              {isAdmin && (
                <Button colorScheme="teal" onClick={() => setIsEditMode(true)}>
                  Edit
                </Button>
              )}
            </Stack>
          </Stack>
        )}
      </Box>
    );
  return (
    <Box w="full" h="full">
      <Page404 title="Supporter Not Found" recoverUrl="/supporters" />;
    </Box>
  );
};
