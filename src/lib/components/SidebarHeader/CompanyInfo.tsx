import { Center, Skeleton, Stack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import Entity from "../Entity/Entity";
import CompanyModal from "../Modals/CompanyModal";
import { useUserCompany } from "lib/hooks/useUserCompany";

const avatarSize = ["30px", "30px", "30px", "40px"];

export const CompanyInfo: React.FC = () => {
  const { company } = useUserCompany();

  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!company) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={4}
      >
        <Skeleton boxSize={avatarSize} minW={avatarSize} borderRadius="md" />
        <Stack w="full" display={["none", "none", "none", "flex"]}>
          <Skeleton w="70%" h="15px" borderRadius="sm" />
          <Skeleton w="50%" h="15px" borderRadius="sm" />
        </Stack>
      </Stack>
    );
  }

  const { name, imageSource, category } = company;

  return (
    <Stack
      direction={["column", "column", "column", "row"]}
      alignItems="center"
      justifyContent="space-between"
      spacing={4}
    >
      <Entity imageUrl={imageSource} title={name} sublabel={category} shrink />
      <Center cursor="pointer" onClick={onOpen}>
        <EditIcon />
      </Center>
      <CompanyModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};
