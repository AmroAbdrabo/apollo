import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { styles } from "lib/styles/globalStyleVariables";
import React from "react";

interface TileProps {
  name: string;
  imageURL: string;
  onClick: () => void;
  hideName?: boolean;
  boxSize?: number;
  editable?: boolean;
  onClickEdit?: () => void;
}

const defaultBoxSize = 120;
const borderRadius = styles.borderRadius.md;

const fallbackFunction = () => console.log("fallback");

export const Tile: React.FC<TileProps> = ({
  name,
  imageURL,
  hideName,
  boxSize,
  onClick,
  editable,
  onClickEdit,
}) => {
  const bg = useColorModeValue("white", "gray.700");
  const fg = useColorModeValue("gray.700", "white");

  return (
    <VStack
      minW={boxSize ?? defaultBoxSize}
      onClick={onClick}
      cursor="pointer"
      position="relative"
      alignItems="center"
    >
      <Avatar
        boxSize={boxSize ?? defaultBoxSize}
        name={name}
        src={imageURL}
        borderRadius={borderRadius}
        bg={bg}
        color={fg}
      />
      {editable && (
        <Flex
          position="absolute"
          top={-5}
          right={-2}
          borderRadius="100%"
          boxSize={27}
          alignItems="center"
          justifyContent="center"
          bg="teal"
          onClick={onClickEdit ?? fallbackFunction}
        >
          <EditIcon color="white" fontSize={14} />
        </Flex>
      )}
      {!hideName && (
        <Heading
          size="sm"
          maxWidth={defaultBoxSize}
          textAlign="center"
          noOfLines={2}
        >
          {name}
        </Heading>
      )}
    </VStack>
  );
};
