/* eslint-disable no-nested-ternary */
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useApplications } from "lib/hooks/useApplications";
import { ApplicationFounderInformation } from "lib/components/Application/ApplicationFounderInformation";
import { ApplicationMetaInformation } from "lib/components/Application/ApplicationMetaInformation";
import { ApplicationStartupInformation } from "lib/components/Application/ApplicationStartupInformation";
import { PageHeader } from "lib/components/PageHeader/PageHeader";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import useAPI from "lib/hooks/useAPI";
import { rejectApplicationWithId } from "lib/modules/firebase/firestore";
import useGuard from "lib/modules/routing/useGuard";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React, { useCallback, useMemo, useState } from "react";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";

const notFound = "N/A";

type ModalType = "approval" | "rejection" | "loading" | "none";

export const ApplicationDetails: NextPageWithLayout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("none");

  const [application, setApplication] =
    useState<Database.ApplicationWithStatusType | null>(null);

  const { isLoading } = useGuard(true, "/landing");
  const router = useRouter();
  const { applicationId } = router.query;

  const { applications, refetchApplications } = useApplications();
  const { approveCompany } = useAPI();

  const [isLoadingAction, setIsLoadingAction] = useState(false);

  useMemo(() => {
    if (applicationId && applications) {
      const foundApplication = applications.find(
        (app) => app.id === applicationId
      );
      setApplication(foundApplication ?? null);
    }
  }, [applicationId, applications]);

  const onApprove = useCallback(async () => {
    if (application?.id) {
      await approveCompany(application.id);
    }
  }, [application?.id, approveCompany]);

  const onReject = useCallback(async () => {
    if (application?.id) {
      await rejectApplicationWithId(application.id);
    }
  }, [application?.id]);

  const onConfirm = useCallback(async () => {
    setIsLoadingAction(true);
    if (modalType === "approval") {
      await onApprove();
    } else if (modalType === "rejection") {
      await onReject();
    }
    await refetchApplications();
    setModalVisible(false);
    setIsLoadingAction(false);

    router.back();
  }, [modalType, onApprove, onReject, router, refetchApplications]);

  if (isLoading || application === null) return <Loading />;

  return (
    <Stack width="full" h="full">
      <PageHeader title="Application Details" route={() => router.back()} />
      <ApplicationMetaInformation
        application={application}
        notFound={notFound}
      />
      <ApplicationStartupInformation
        application={application}
        notFound={notFound}
      />
      <ApplicationFounderInformation
        application={application}
        notFound={notFound}
      />
      {/* We only show the approve / reject buttons if the application was not already rejected */}
      {application.status === "applied" && (
        <HStack justifyContent="flex-end" spacing={5} pb={6}>
          <Button
            onClick={() => {
              setModalType("rejection");
              setModalVisible(true);
            }}
          >
            Reject
          </Button>
          <Button
            colorScheme="teal"
            onClick={() => {
              setModalType("approval");
              setModalVisible(true);
            }}
          >
            Approve
          </Button>
        </HStack>
      )}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalOverlay />
        <ModalContent>
          {modalType === "approval" && <ModalHeader>Approval</ModalHeader>}
          {modalType === "rejection" && <ModalHeader>Rejection</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>
            {modalType === "approval" && (
              <Text>{`Are you sure you want to approve ${application.startup.name}?`}</Text>
            )}
            {modalType === "rejection" && (
              <Text>{`Are you sure you want to reject and delete ${application.startup.name}?`}</Text>
            )}
          </ModalBody>

          <ModalFooter>
            {(modalType === "approval" || modalType === "rejection") && (
              <>
                <Button
                  colorScheme="ghost"
                  mr={3}
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={onConfirm}
                  isLoading={isLoadingAction}
                >
                  Confirm
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

ApplicationDetails.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default ApplicationDetails;
