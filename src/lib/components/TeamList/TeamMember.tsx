import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import useAPI from "lib/hooks/useAPI";
import React, { useState } from "react";
import { Database } from "../../../../shared/types";
import { MemberCell } from "../MembersList/MemberCell";

interface Props {
  member: Database.UserType;
}

export const TeamMember: React.FC<Props> = ({ member }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <VStack>
      <Avatar
        size="lg"
        name={`${member.firstName} ${member.lastName}`}
        src={member.profilePictureURL}
        onClick={() => setModalVisible(true)}
      />
      <Text fontSize="xs" fontWeight={500} textAlign="center">
        {member.firstName}
      </Text>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalOverlay />
        <ModalContent width="fit-content" bg="none">
          <MemberCell member={member} size={400} />
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export const AddTeamMember: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const { generateInvitationCode } = useAPI();

  return (
    <Box>
      <Avatar
        size="lg"
        bg="white"
        icon={<AddIcon color="teal" />}
        boxShadow="sm"
        cursor="pointer"
        onClick={() => setModalVisible(true)}
      />
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Team Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Stack>
              <Text>Enter the email of the person you want to invite.</Text>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  variant="filled"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="teal"
                onClick={() => {
                  generateInvitationCode(email);
                  setModalVisible(false);
                }}
              >
                Send Invite
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
