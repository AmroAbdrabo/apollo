import {
  Avatar,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { PageHeader } from "lib/components/PageHeader/PageHeader";
import { Socials } from "lib/components/Socials/Socials";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import useGuard from "lib/modules/routing/useGuard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";
import { ContactMentorForm } from "./ContactMentorForm";
import { EditMentorDetailView } from "./EditMentorDetailView";

export const MentorDetailView: React.FC = () => {
  // Auth State
  const { isLoading } = useGuard(true, "/landing");
  const { userGroup } = useAuth();

  // Meta Data
  const router = useRouter();
  const { mentorId } = router.query;
  const { mentors } = useAppSelector(generalSelector);
  const [mentor, setMentor] = useState<Database.MentorType>();

  // Edit Mode
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Contact Form
  const [contactModalVisible, setContactModalVisible] = useState(false);

  // Color Mode
  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";

  useEffect(() => {
    if (mentorId) {
      const foundMentor = mentors.find((m) => m.id === mentorId);
      if (foundMentor) {
        setMentor(foundMentor);
      }
    }
  }, [mentorId, mentors]);

  const isAdmin = userGroup === "admin";

  if (isLoading || !mentor) return <Loading />;

  return (
    <Box w="full" h="full">
      {isOpen && (
        <EditMentorDetailView mentor={mentor} backToOverview={onClose} />
      )}
      {!isOpen && (
        <Stack w="full" h="full">
          <PageHeader title="" route={() => router.back()} />

          <Stack direction="column" spacing={5}>
            <Stack
              direction={["column", "row"]}
              alignItems="center"
              spacing={5}
            >
              <Box pos="relative">
                <Avatar
                  boxSize={120}
                  src={mentor.imageUrl}
                  borderRadius="md"
                  bg={lightMode ? "white" : "gray.700"}
                  name={`${mentor.firstName} ${mentor.lastName}`}
                />
                {mentor?.linkedinUrl && (
                  <Socials
                    logo={<FaLinkedinIn />}
                    link={mentor.linkedinUrl}
                    pos="absolute"
                    right={1}
                    bottom={1}
                  />
                )}
              </Box>
              <Stack>
                <Heading size="xs" color="teal">
                  {mentor.position}
                </Heading>
                <Heading size="lg">{`${mentor.firstName} ${mentor.lastName}`}</Heading>
              </Stack>
            </Stack>
            <Wrap>
              {mentor.expertiseAreas?.map((expertiseArea) => (
                <Tag key={expertiseArea}>{expertiseArea}</Tag>
              ))}
            </Wrap>
            <Text>{mentor.desc}</Text>
          </Stack>

          <Stack direction="row">
            {mentor.publicEmail && (
              <Button
                onClick={() => {
                  setContactModalVisible(true);
                }}
              >
                Contact Mentor
              </Button>
            )}
            {isAdmin && (
              <Button colorScheme="teal" onClick={onOpen}>
                Edit Mentor
              </Button>
            )}
          </Stack>
        </Stack>
      )}
      <Modal
        onClose={() => setContactModalVisible(false)}
        isOpen={contactModalVisible}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Supporter</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={5}>
            <ContactMentorForm
              onFinish={() => setContactModalVisible(false)}
              mentorName={`${mentor.firstName} ${mentor.lastName}`}
              mentorEmail={mentor.publicEmail}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
