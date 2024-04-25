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

interface Props {
  label: string;
  values: string[];
  setFilter: (values: string[]) => void;
}

export const MultiSelectionFilter: React.FC<Props> = ({
  label,
  values,
  setFilter,
}) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} minW="160px">
        {label}
      </MenuButton>
      <MenuList maxHeight="200px" overflow="auto">
        <MenuOptionGroup
          type="checkbox"
          onChange={(selectedValues) => {
            if (typeof selectedValues === "object") {
              setFilter(selectedValues);
            }
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
