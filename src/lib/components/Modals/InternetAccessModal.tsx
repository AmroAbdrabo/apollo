import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useUserCompany } from "lib/hooks/useUserCompany";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "../../../../shared/types";

interface Inputs {
  email: string;
  fullAddress: string;
  dateOfBirth: string;
}

const InternetAccessModal: React.FC<Omit<ModalProps, "children">> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const toast = useToast();

  const { user, company } = useUserCompany();

  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    fullAddress,
    dateOfBirth,
  }) => {
    if (user && company) {
      const requestBody: API.RequestInternetAccess.Request = {
        companyName: company.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        fullAddress,
        dateOfBirth,
      };
      fetch(
        "https://us-central1-rockethub-4e6bc.cloudfunctions.net/rockethub/api/v1/requestInternetAccess",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      )
        .then((res) => {
          if (res.status === 200) {
            toast({
              status: "success",
              title: "Request Successful",
              description:
                "An email has been sent to the IT desk, they will send you an email shortly.",
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              status: "error",
              title: "Request Failed",
              description: "Your request failed. Please try again later.",
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          toast({
            status: "error",
            title: "Error",
            description: err,
            duration: 5000,
            isClosable: true,
          });
        });
      return;
    }
    toast({
      title: "Error",
      description: "No user or company found.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Internet Access</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text fontWeight={600}>
                This form is only to be filled out by non-ETH members
              </Text>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("email", { required: "An email is required." })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.fullAddress)}>
                <FormLabel>Full Address</FormLabel>
                <Input
                  {...register("fullAddress", {
                    required: "An address is required.",
                  })}
                />
                <FormErrorMessage>
                  {errors.fullAddress?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.dateOfBirth)}>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  {...register("dateOfBirth", {
                    required: "A date of birth is required.",
                  })}
                />
                <FormErrorMessage>
                  {errors.dateOfBirth?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Close
              </Button>
              <Button colorScheme="teal" type="submit">
                Submit
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default InternetAccessModal;
