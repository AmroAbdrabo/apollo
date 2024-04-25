import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "lib/hooks/useUser";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import {
  addLinkedinLinkToHandle,
  convertLinkedInLinkToHandle,
} from "lib/modules/utils/shared";
import React, { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Entity from "../Entity/Entity";
import { UploadImage } from "../UploadImage/UploadImage";

interface Inputs {
  firstname: string;
  lastname: string;
  position: string;
  linkedinHandle: string;
  imageUrl: string;
}

const UserModal: React.FC<Omit<ModalProps, "children">> = ({
  isOpen,
  onClose,
}) => {
  // Firebase
  const { updateUser } = useFirestore();

  const { user, refetchUser } = useUser();

  // File Path
  const filePath = useMemo(() => `users/${user?.id}/profile`, [user]);

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstname: user?.firstName,
      lastname: user?.lastName,
      position: user?.position,
      linkedinHandle: user?.linkedInURL
        ? convertLinkedInLinkToHandle(user?.linkedInURL)
        : "",
    },
  });

  // Toast
  const toast = useToast();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    ({ firstname, lastname, position, linkedinHandle, imageUrl }) => {
      if (user) {
        setIsLoading(true);
        updateUser(user.id, {
          firstName: firstname,
          lastName: lastname,
          position,
          linkedInURL: addLinkedinLinkToHandle(linkedinHandle),
          profilePictureURL: imageUrl,
        })
          .then(() => {
            refetchUser?.();
            toast({
              status: "success",
              title: "Profile Updated",
              description: "Your profile has been updated.",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              status: "error",
              title: "Error",
              description: err,
              duration: 5000,
              isClosable: true,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
        return;
      }
      toast({
        status: "error",
        title: "Error",
        description: "No user found to update, missing uid.",
        duration: 5000,
        isClosable: true,
      });
    },
    [toast, updateUser, user, refetchUser]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Personal Info</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Stack spacing={3}>
              <Entity
                imageUrl={user?.profilePictureURL}
                title={`${user?.firstName} ${user?.lastName}`}
                sublabel={user?.position}
              />
              <UploadImage
                title="Profile Picture"
                filePath={filePath}
                isPrefixPath={false}
                setUrl={(url) => setValue("imageUrl", url)}
              />
              <FormControl isInvalid={Boolean(errors.firstname)}>
                <FormLabel>First Name</FormLabel>
                <Input
                  {...register("firstname", {
                    required: "A first name is required",
                  })}
                />
                <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.lastname)}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  {...register("lastname", {
                    required: "A last name is required",
                  })}
                />
                <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.position)}>
                <FormLabel>Position</FormLabel>
                <Input
                  {...register("position", {
                    required: "A position is required",
                  })}
                />
                <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>LinkedIn</FormLabel>
                <InputGroup>
                  <InputLeftAddon>linkedin.com/in/</InputLeftAddon>
                  <Input {...register("linkedinHandle")} />
                </InputGroup>
                <FormHelperText>
                  Add your LinkedIn handle, e.g elonmusk
                </FormHelperText>
              </FormControl>
              <HStack>
                <Button w="full" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  w="full"
                  type="submit"
                  isLoading={isLoading}
                >
                  Update
                </Button>
              </HStack>
            </Stack>
          </ModalBody>
        </form>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
