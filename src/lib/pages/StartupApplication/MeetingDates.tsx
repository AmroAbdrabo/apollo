import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { convertInputDateToTimestamp } from "lib/modules/utils/shared";
import React, { useEffect, useState } from "react";
import { Database } from "../../../../shared/types";

interface Props {
  updateApplicationStep: () => void;
  updateApplicationData: (data: Partial<Database.ApplicationType>) => void;
}

export const MeetingDates: React.FC<Props> = ({
  updateApplicationData,
  updateApplicationStep,
}) => {
  const [meetingDateOne, setMeetingDateOne] = useState("");
  const [meetingDateTwo, setMeetingDateTwo] = useState("");
  const [meetingDateThree, setMeetingDateThree] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      meetingDateOne !== "" && meetingDateTwo !== "" && meetingDateThree !== ""
    );
  }, [meetingDateOne, meetingDateTwo, meetingDateThree]);

  const onSubmit = () => {
    updateApplicationData({
      meetingDates: [
        convertInputDateToTimestamp(meetingDateOne),
        convertInputDateToTimestamp(meetingDateTwo),
        convertInputDateToTimestamp(meetingDateThree),
      ],
    });
    updateApplicationStep();
  };

  return (
    <Stack spacing="30px">
      <Box>
        <Heading size="sm">Interview Dates</Heading>
        <Text>
          We would like to get to know you! Please select three dates on which
          we can have a chat.
        </Text>
      </Box>

      <FormControl isRequired>
        <FormLabel htmlFor="dateOfBirth">First Proposal</FormLabel>
        <Input
          variant="filled"
          placeholder="Please enter your date of birth"
          type="date"
          id="one"
          onChange={(event) => setMeetingDateOne(event.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="dateOfBirth">Second Proposal</FormLabel>
        <Input
          variant="filled"
          placeholder="Please enter your date of birth"
          type="date"
          id="one"
          onChange={(event) => setMeetingDateTwo(event.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="dateOfBirth">Third Proposal</FormLabel>
        <Input
          variant="filled"
          placeholder="Please enter your date of birth"
          type="date"
          id="one"
          onChange={(event) => setMeetingDateThree(event.target.value)}
        />
      </FormControl>

      <Button colorScheme="teal" disabled={!isValid} onClick={onSubmit}>
        Summary
      </Button>
    </Stack>
  );
};
