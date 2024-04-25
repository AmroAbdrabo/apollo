import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Props {
  label: string;
  defaultValue: string;
  values: string[];
  setFilter: (value: string) => void;
}

export const SingleSelectionFilter: React.FC<Props> = ({
  label,
  defaultValue,
  values,
  setFilter,
}) => {
  return (
    <Menu>
      <MenuButton as={Button} w="min">
        {label}
        <ChevronDownIcon />
      </MenuButton>
      <MenuList maxHeight="200px" overflow="auto">
        <MenuOptionGroup
          type="radio"
          defaultValue={defaultValue}
          onChange={(selectedValue) => {
            if (typeof selectedValue === "string") setFilter(selectedValue);
          }}
        >
          {values.map((value) => {
            return (
              <MenuItemOption key={value} value={value}>
                <Text>{value}</Text>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
