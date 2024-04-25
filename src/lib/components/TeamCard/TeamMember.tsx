import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import useAPI from "lib/hooks/useAPI";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Database } from "../../../../shared/types";

interface Props {
  member: Database.UserType;
}

const TeamMember: React.FC<Props> = ({ member }) => {
  const { profilePictureURL, firstName, lastName } = member;
  const fullName = `${firstName} ${lastName}`;
  return (
    <VStack>
      <Avatar src={profilePictureURL} name={fullName} />
      <Text>{firstName}</Text>
    </VStack>
  );
};

interface AddTeamMemberInputs {
  email: string;
}

export const AddTeamMember: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { generateInvitationCode } = useAPI();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTeamMemberInputs>();

  const onSubmit: SubmitHandler<AddTeamMemberInputs> = useCallback(
    ({ email }) => {
      setIsLoading(true);
      generateInvitationCode(email)
        .then(() => {
          toast({
            title: "Invitation sent",
            description: "Your team member has been invited to join your team",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          onClose();
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [generateInvitationCode, onClose, toast]
  );

  return (
    <VStack onClick={onOpen} cursor="pointer">
      <Avatar />
      <Text>Add</Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a Team Member</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormControl isInvalid={Boolean(errors.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "An email is required.",
                    })}
                  />
                  <FormHelperText>
                    Enter the email of the person you want to invite.
                  </FormHelperText>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" isLoading={isLoading}>
                Send Invite
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </VStack>
  );
};

export default TeamMember;
