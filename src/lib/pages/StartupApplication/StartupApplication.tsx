import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ApplicationFounderInformation } from "lib/components/Application/ApplicationFounderInformation";
import { ApplicationMetaInformation } from "lib/components/Application/ApplicationMetaInformation";
import { ApplicationStartupInformation } from "lib/components/Application/ApplicationStartupInformation";
import useAPI from "lib/hooks/useAPI";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Database } from "../../../../shared/types";
import { EligibilityCiteria } from "./EligibilityCiteria";
import { MeetingDates } from "./MeetingDates";
import { PersonalInfo } from "./PersonalInfo";
import { StartupInfo } from "./StartupInfo";

const emptyApplication: Database.ApplicationType = {
  meetingDates: [],
  submissionDate: 0,
  startup: {
    name: "",
    description: "",
    stage: "",
    initialTeamSize: 0,
    startupAge: "",
    incorporationDate: undefined,
    desiredDuration: undefined,
    teamDescription: "",
    website: "",
    category: "",
  },
  founder: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: 0,
    affiliationOrBackground: [],
    backgroundDescription: "",
    enrolmentState: "",
  },
};

const notFound = "N/A";

export type ApplicationStep =
  | "eligibility"
  | "startup"
  | "founder"
  | "meetings"
  | "summary"
  | "done";
export const StartupApplication = () => {
  const [applicationStep, setApplicationStep] =
    useState<ApplicationStep>("eligibility");

  const [applicationData, setApplicationData] =
    useState<Database.ApplicationType>(emptyApplication);

  const router = useRouter();

  const updateApplicationStep = useCallback(() => {
    if (applicationStep === "eligibility") {
      setApplicationStep("startup");
    } else if (applicationStep === "startup") {
      setApplicationStep("founder");
    } else if (applicationStep === "founder") {
      setApplicationStep("meetings");
    } else if (applicationStep === "meetings") {
      setApplicationStep("summary");
    } else if (applicationStep === "summary") {
      setApplicationStep("done");
    }
  }, [applicationStep]);

  const updateApplicationData = (data: Partial<Database.ApplicationType>) => {
    const currentData = applicationData;
    setApplicationData({ ...currentData, ...data });
  };

  const { createCompany } = useAPI();

  const submitForm = () => {
    updateApplicationStep();
    const finishedData = applicationData;
    finishedData.submissionDate = Date.now();
    createCompany(finishedData);
  };

  return (
    <Stack overflow="auto" margin="25px auto" padding="20px" maxW="1000px">
      <Heading size="sm">RocketHub.</Heading>
      <Box>
        <Heading fontSize="lg">Startup Application</Heading>
        {applicationStep === "eligibility" && (
          <Text>Completion time: 5 - 10 minutes</Text>
        )}
      </Box>

      <Stack
        divider={<StackDivider borderColor="gray.200" />}
        spacing="36px"
        overflow="auto"
        padding="20px"
        maxW="1000px"
        margin="25px auto"
      >
        {applicationStep === "eligibility" && (
          <EligibilityCiteria updateApplicationStep={updateApplicationStep} />
        )}
        {applicationStep === "startup" && (
          <StartupInfo
            updateApplicationStep={updateApplicationStep}
            updateApplicationData={updateApplicationData}
          />
        )}
        {applicationStep === "founder" && (
          <PersonalInfo
            updateApplicationStep={updateApplicationStep}
            updateApplicationData={updateApplicationData}
          />
        )}

        {applicationStep === "meetings" && (
          <MeetingDates
            updateApplicationStep={updateApplicationStep}
            updateApplicationData={updateApplicationData}
          />
        )}
        {applicationStep === "summary" && (
          <Stack margin="0px auto" width="full" maxWidth={1200} mt="20px">
            <ApplicationMetaInformation
              application={applicationData}
              notFound={notFound}
            />
            <ApplicationStartupInformation
              application={applicationData}
              notFound={notFound}
            />
            <ApplicationFounderInformation
              application={applicationData}
              notFound={notFound}
            />
          </Stack>
        )}
      </Stack>
      {applicationStep === "summary" && (
        <VStack>
          <Button colorScheme="teal" onClick={submitForm}>
            Submit
          </Button>
        </VStack>
      )}
      {applicationStep === "done" && (
        <Center w="full" h="full">
          <Stack maxW="400px">
            <Heading size="md">Thank you for your application!</Heading>
            <Text size="md">
              We will get back to you once we have reviewed your application.
            </Text>
            <Button colorScheme="teal" onClick={() => router.back()}>
              Take me back!
            </Button>
          </Stack>
        </Center>
      )}
    </Stack>
  );
};
