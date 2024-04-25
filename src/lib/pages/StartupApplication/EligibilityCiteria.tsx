import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  updateApplicationStep: () => void;
}

export const EligibilityCiteria: React.FC<Props> = ({
  updateApplicationStep,
}) => {
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(checkedItems.every((item) => item));
  }, [checkedItems]);

  return (
    <Stack spacing="30px">
      <Heading size="sm">Eligibility Criteria</Heading>

      <FormControl isRequired>
        <FormLabel>Does your company meet the following criteria?</FormLabel>
        <Stack>
          <Checkbox
            isChecked={checkedItems[0]}
            isRequired
            onChange={(event) =>
              setCheckedItems([
                event.target.checked,
                checkedItems[1],
                checkedItems[2],
                checkedItems[3],
              ])
            }
          >
            At least 1 of your team members is ETH-related
          </Checkbox>
          <Checkbox
            isChecked={checkedItems[1]}
            isRequired
            onChange={(event) =>
              setCheckedItems([
                checkedItems[0],
                event.target.checked,
                checkedItems[2],
                checkedItems[3],
              ])
            }
          >
            Your startup / project is early stage
          </Checkbox>
          <Checkbox
            isChecked={checkedItems[2]}
            isRequired
            onChange={(event) =>
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                event.target.checked,
                checkedItems[3],
              ])
            }
          >
            Your team size is less than six
          </Checkbox>
          <Checkbox
            isChecked={checkedItems[3]}
            isRequired
            onChange={(event) =>
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                checkedItems[2],
                event.target.checked,
              ])
            }
          >
            Your company is not incorporated or was incorporated less than 2
            years ago
          </Checkbox>
          <FormHelperText>These criteria must be met to apply.</FormHelperText>
        </Stack>
      </FormControl>
      <Button disabled={!isValid} onClick={updateApplicationStep}>
        Continue
      </Button>
    </Stack>
  );
};
