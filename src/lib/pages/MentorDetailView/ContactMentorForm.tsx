import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import useAPI from "lib/hooks/useAPI";
import { useUserCompany } from "lib/hooks/useUserCompany";
import { useFirebaseAuth } from "lib/modules/firebase/firebaseAuth";
import React, { useCallback, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  mentorName: string;
  mentorEmail: string;
  onFinish: () => void;
}

interface Inputs {
  topic: string;
  meetingDateOne: string;
  meetingDateTwo: string;
  meetingDateThree: string;
  preferredMeetingType: string;
  companyDescription: string;
}

export const ContactMentorForm: React.FC<Props> = ({
  onFinish,
  mentorEmail,
  mentorName,
}) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { contactMentor } = useAPI();

  const { user } = useFirebaseAuth();
  const { company } = useUserCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (!company) {
        toast({
          title: "Error",
          description: "Failed to contact mentor. Company not found.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (!user || !user.displayName || !user.email) {
        toast({
          title: "Error",
          description: "Failed to contact mentor. User not found.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setIsLoading(true);

      const meetingDates = [
        data.meetingDateOne,
        data.meetingDateTwo,
        data.meetingDateThree,
      ];

      contactMentor({
        mentorName,
        mentorEmail,
        userName: user.displayName,
        userEmail: user.email,
        companyName: company?.name,
        companyDescription: data.companyDescription,
        meetingDates: meetingDates,
        topic: data.topic,
        preferredMeetingType: data.preferredMeetingType,
      })
        .then(() => {
          toast({
            title: "Mentor contacted",
            description: "The email to the mentor has been successfully sent.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onFinish();
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: `Failed to contact the mentor. ${err?.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [company, onFinish, toast, contactMentor, mentorEmail, mentorName, user]
  );

  return (
    <Stack direction="column" w="full" h="full" overflow="auto" padding={3}>
      <Heading fontSize="lg">Contact Mentor</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.topic)} isRequired>
          <FormLabel>
            What would you like to discuss over the mentoring session?
          </FormLabel>
          <Input
            {...register("topic", {
              required: "The topic needs to be filled out.",
            })}
          />
          <FormErrorMessage>{errors.topic?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.meetingDateOne)} isRequired>
          <FormLabel>First Date Proposal </FormLabel>
          <Input
            {...register("meetingDateOne", {
              required: "The first date proposal needs to be filled out.",
            })}
            type="datetime-local"
          />
        </FormControl>
        <FormControl isInvalid={Boolean(errors.meetingDateTwo)} isRequired>
          <FormLabel>Second Date Proposal </FormLabel>
          <Input
            {...register("meetingDateTwo", {
              required: "The second date proposal needs to be filled out.",
            })}
            type="datetime-local"
          />
        </FormControl>
        <FormControl isInvalid={Boolean(errors.meetingDateThree)} isRequired>
          <FormLabel>Third Date Proposal </FormLabel>
          <Input
            {...register("meetingDateThree", {
              required: "The third date proposal needs to be filled out.",
            })}
            type="datetime-local"
          />
        </FormControl>

        <FormControl
          isInvalid={Boolean(errors.preferredMeetingType)}
          isRequired
        >
          <FormLabel htmlFor="category">
            Would you prefer to hold the mentoring session online or in person?
          </FormLabel>
          <Select
            variant="filled"
            placeholder="Type"
            {...register("preferredMeetingType", {
              required: "The preferred meeting type needs to be filled out.",
            })}
          >
            <option key={"Online"} value={"Online"}>
              Online
            </option>
            <option key={"In Person"} value={"In Person"}>
              In Person
            </option>
          </Select>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.companyDescription)} isRequired>
          <FormLabel>
            Give the mentor a short introduction of your startup:
          </FormLabel>
          <Input
            {...register("companyDescription", {
              required: "The company description needs to be filled out.",
            })}
          />
        </FormControl>

        <Stack direction="row" w="full" paddingTop={5}>
          <Button type="submit" isLoading={isLoading} variant="solid" w="full">
            Create
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
