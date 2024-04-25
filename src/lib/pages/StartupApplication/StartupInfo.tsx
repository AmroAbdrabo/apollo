import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { convertInputDateToTimestamp } from "lib/modules/utils/shared";
import React, { useEffect, useState } from "react";
import { Database } from "../../../../shared/types";

interface Props {
  updateApplicationStep: () => void;
  updateApplicationData: (data: Partial<Database.ApplicationType>) => void;
}

export const StartupInfo: React.FC<Props> = ({
  updateApplicationStep,
  updateApplicationData,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [field, setField] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [stage, setStage] = useState("");
  const [website, setWebsite] = useState("");
  const [companyAge, setCompanyAge] = useState("");
  const [duration, setDuration] = useState("");
  const [incorporation, setIncorporation] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamSize, setTeamSize] = useState(1);

  const [isValid, setIsValid] = useState(false);

  const onSubmit = () => {
    updateApplicationData({
      startup: {
        name: companyName,
        description: missionStatement,
        stage: stage,
        initialTeamSize: teamSize,
        startupAge: companyAge,
        incorporationDate: convertInputDateToTimestamp(incorporation),
        desiredDuration: duration,
        teamDescription: teamDescription,
        website: website,
        category: field,
      },
    });
    updateApplicationStep();
  };

  useEffect(() => {
    setIsValid(
      companyName.length > 0 &&
        missionStatement.length > 0 &&
        teamDescription.length > 0 &&
        teamSize > 0 &&
        field.length > 0 &&
        stage.length > 0 &&
        duration.length > 0
    );
  }, [
    companyName,
    duration,
    field,
    missionStatement,
    stage,
    teamDescription,
    teamSize,
  ]);

  return (
    <Stack spacing="30px">
      <Heading size="sm">Startup Information</Heading>

      <FormControl isRequired>
        <FormLabel>Startup Name</FormLabel>
        <Input
          id="name"
          variant="filled"
          placeholder="Enter your startup name"
          onChange={(event) => setCompanyName(event.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="description">Mission Statement</FormLabel>
        <Textarea
          id="description"
          variant="filled"
          placeholder="What is your startup's mission statement?"
          onChange={(event) => setMissionStatement(event.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="category">Startup Field</FormLabel>
        <Select
          variant="filled"
          placeholder="Field"
          onChange={(event) => setField(event.target.value)}
        >
          {Database.companyCategoryArray.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <FormHelperText>
          If you cannot find a fitting category please choose Other
        </FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="initialTeamSize">
          What is the size of your team?
        </FormLabel>
        <NumberInput variant="filled" defaultValue={1} max={6} min={1}>
          <NumberInputField
            id="initialTeamSize"
            onChange={(event) => setTeamSize(parseInt(event.target.value, 10))}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="teamDescription">Team Description</FormLabel>
        <Textarea
          id="teamDescription"
          variant="filled"
          placeholder="Tell us something about yourself and your team"
          onChange={(event) => setTeamDescription(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Incorporation Date</FormLabel>
        <Input
          variant="filled"
          type="date"
          id="incorporationDate"
          onChange={(event) => setIncorporation(event.target.value)}
        />
        <FormHelperText>Please leave empty if not relevant</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="stage">At what stage is your startup?</FormLabel>
        <Select
          variant="filled"
          placeholder="Stage"
          onChange={(event) => setStage(event.target.value)}
        >
          <option value="idea">Idea</option>
          <option value="prototype">Prototype</option>
          <option value="operational">Operational</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="startupAge">
          How long have you already been in business?
        </FormLabel>
        <Select
          id="startupAge"
          variant="filled"
          placeholder="Timeframe"
          onChange={(event) => setCompanyAge(event.target.value)}
        >
          <option value="< 1 year">Less than 1 year</option>
          <option value="< 3 years">Less than 3 years</option>
          <option value="< 5 years">Less than 5 years</option>
          <option value="> 5 years">More than 5 years</option>
        </Select>
        <FormHelperText>Leave empty if not relevant.</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="desiredDuration">
          How many months would you like to stay in our coworking space?
        </FormLabel>
        <NumberInput variant="filled" min={1}>
          <NumberInputField
            id="desiredDuration"
            placeholder="Months"
            onChange={(event) => setDuration(event.target.value)}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="website">
          Please enter your company website
        </FormLabel>
        <Input
          placeholder="https://eth.ec"
          variant="filled"
          onChange={(event) => setWebsite(event.target.value)}
        />
        <FormHelperText>
          Please leave empty if you do not have a website
        </FormHelperText>
      </FormControl>
      <Button disabled={!isValid} onClick={onSubmit}>
        Continue
      </Button>
    </Stack>
  );
};
