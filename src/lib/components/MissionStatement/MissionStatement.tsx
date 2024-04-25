import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useCompanyById } from "lib/hooks/useCompanyById";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSave } from "react-icons/bi";
import CardContainer from "../CardContainer/CardContainer";

interface Inputs {
  missionStatement: string;
}

interface Props {
  companyId: string;
}

const MissionStatement: React.FC<Props> = ({ companyId }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { updateCompanyWithId } = useFirestore();

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const { company, refetchCompany } = useCompanyById(companyId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  // Listen on changes to the company mission statement to seed form
  useEffect(() => {
    if (company) {
      reset({ missionStatement: company.missionStatement });
    }
  }, [company, reset]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    ({ missionStatement: newMissionStatement }) => {
      if (!company) {
        toast({
          title: "Error",
          description: "Failed to update mission statement. Company not found.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setIsLoading(true);
      updateCompanyWithId(company.id, {
        missionStatement: newMissionStatement,
      })
        .then(() => {
          refetchCompany();
          toast({
            title: "Mission statement updated",
            description: "Your mission statement has been updated",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: `Failed to update mission statement. ${err?.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [company, onClose, toast, updateCompanyWithId, refetchCompany]
  );

  return (
    <CardContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Heading size="sm">Mission Statement</Heading>
          {!isOpen && (
            <Text>
              {company?.missionStatement || "Add your Mission Statement"}
            </Text>
          )}
          {isOpen && (
            <FormControl isInvalid={Boolean(errors.missionStatement)}>
              <Textarea
                {...register("missionStatement", {
                  required: "A mission statement is required.",
                })}
              />
              <FormErrorMessage>
                {errors.missionStatement?.message}
              </FormErrorMessage>
            </FormControl>
          )}
          <Flex justifyContent="flex-end">
            {!isOpen && (
              <Button
                colorScheme="teal"
                onClick={onOpen}
                leftIcon={<EditIcon />}
              >
                Edit
              </Button>
            )}
            {isOpen && (
              <ButtonGroup>
                <Button onClick={onClose} isLoading={isLoading}>
                  Close
                </Button>
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isLoading}
                  leftIcon={<BiSave />}
                >
                  Save
                </Button>
              </ButtonGroup>
            )}
          </Flex>
        </Stack>
      </form>
    </CardContainer>
  );
};
export default MissionStatement;
