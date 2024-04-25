import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { convertInputDateToTimestamp } from "lib/modules/utils/shared";
import React, { useEffect, useState } from "react";
import { Database } from "../../../../shared/types";

const backgrounds = [
  "ETH Zurich",
  "University of Zurich",
  "University of St. Gallen",
  "EPFL",
  "Other university",
  "Not from academia",
  "ETH Alumni",
  "ETH Spin-off",
  "EC Award",
  "EC Alumni",
  "Other",
];

interface Props {
  updateApplicationStep: () => void;
  updateApplicationData: (data: Partial<Database.ApplicationType>) => void;
}

export const PersonalInfo: React.FC<Props> = ({
  updateApplicationStep,
  updateApplicationData,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [background, setBackground] = useState("");
  const [backgroundDescription, setBackgroundDescription] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    console.log(birthday);
    setIsValid(
      firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        birthday.length > 0 &&
        phoneNumber.length > 0 &&
        background.length > 0 &&
        backgroundDescription.length > 0
    );
  }, [
    firstName,
    lastName,
    email,
    birthday,
    phoneNumber,
    background,
    backgroundDescription,
    isEnrolled,
  ]);

  const onSubmit = () => {
    updateApplicationData({
      founder: {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth: convertInputDateToTimestamp(birthday),
        affiliationOrBackground: [background],
        backgroundDescription: backgroundDescription,
        enrolmentState: isEnrolled ? "Yes" : "No",
      },
    });
    updateApplicationStep();
  };

  return (
    <Stack spacing="30px">
      <Heading size="sm">Personal Information</Heading>

      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          id="firstName"
          variant="filled"
          placeholder="Please enter your first name"
          onChange={(event) => setFirstName(event.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          variant="filled"
          placeholder="Please enter your last name"
          onChange={(event) => setLastName(event.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="dateOfBirth">Birthday</FormLabel>
        <Input
          variant="filled"
          placeholder="Please enter your date of birth"
          type="date"
          id="dateOfBirth"
          onChange={(event) => setBirthday(event.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <Input
          variant="filled"
          placeholder="Please enter your email address"
          id="email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
        <NumberInput variant="filled" id="phoneNumber">
          <NumberInputField
            id="initialTeamSize"
            placeholder="41781234567"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </NumberInput>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="background">
          What is your background or affiliation?
        </FormLabel>
        <Select
          id="background"
          variant="filled"
          placeholder="Select background"
          onChange={(event) => setBackground(event.target.value)}
        >
          {backgrounds.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="email">Describe your Background</FormLabel>
        <Textarea
          variant="filled"
          placeholder="Describe your background"
          id="backgroundDescription"
          onChange={(event) => setBackgroundDescription(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="enrollmentStatus">
          Are you currently enrolled at a university?
        </FormLabel>
        <Checkbox onChange={(event) => setIsEnrolled(event.target.checked)} />
      </FormControl>
      <Button disabled={!isValid} onClick={onSubmit}>
        Continue
      </Button>
    </Stack>
  );
};
