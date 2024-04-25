import { AddIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MentorsList } from "lib/components/MentorsList/MentorsList";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import useGuard from "lib/modules/routing/useGuard";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { Loading } from "../Loading/Loading";
import { EditMentorDetailView } from "../MentorDetailView/EditMentorDetailView";

const Mentors: NextPageWithLayout = () => {
  // guarded route -> redirect to /login if authentication is missing
  const { isLoading } = useGuard(true, "/landing");
  const { userGroup } = useAuth();
  const isAdmin = userGroup === "admin";

  // Add Mentor Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Help Modal
  const {
    isOpen: isHelpOpen,
    onOpen: onOpenHelp,
    onClose: onCloseHelp,
  } = useDisclosure();

  const { mentors } = useAppSelector(generalSelector);

  if (isLoading || !mentors) return <Loading />;

  return (
    <Stack w="full">
      <Heading size="md">Mentors</Heading>
      <Stack direction={["column", "row"]} justifyContent="flex-end">
        {isAdmin && (
          <IconButton
            onClick={onOpen}
            colorScheme="teal"
            icon={<AddIcon />}
            aria-label="addMentor"
          />
        )}
        <IconButton
          aria-label="help"
          icon={<QuestionIcon />}
          onClick={onOpenHelp}
        />
      </Stack>
      <MentorsList mentors={mentors} />
      <Modal onClose={onClose} isOpen={isOpen} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Mentor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditMentorDetailView
              mentor={{
                id: "",
                firstName: "",
                lastName: "",
                desc: "",
                expertiseAreas: [], // tbd
                position: "",
                publicEmail: "",
                linkedinUrl: "",
                imageUrl: "",
              }}
              isNewMentor
              backToOverview={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseHelp} isOpen={isHelpOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What is the Mentorship Program?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>
                Welcome to our new mentorship platform! The goal of the platform
                is to facilitate and foster exchange between RocketHub startups
                and industry experts or experienced founders. The mentorship
                program gives startups the possibility to organise 30-60min
                sessions with mentors to get advice on a topic or problem.
              </Text>
              <Text>
                The startups should have a concrete idea what they would like to
                discuss with the mentor before organising a mentoring session.
                On the other hand mentors have offered to provide free advice as
                best they can with their busy time schedule. This program is not
                here for mentors to sell you additional startup consulting
                services. Mentors should reply to emails you sent through this
                mentoring program within 2 weeks. If you have any questions
                about the mentoring program or if a mentor does not reply or
                comply with the rules above, please contact us{" "}
                <Link href="mailto:rockethub@entrepreneur-club.org">here</Link>.
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseHelp}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

Mentors.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default Mentors;
