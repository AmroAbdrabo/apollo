import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Database } from "../../../../shared/types";
import CardContainer from "../CardContainer/CardContainer";
import DeleteModal from "./DeleteModal";

interface Props {
  company: Database.CompanyType | null;
  onDelete: () => void;
}

const DeleteCard: React.FC<Props> = ({ company, onDelete }) => {
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <CardContainer>
      <Heading size="sm">Remove Startup</Heading>
      <Flex flexDir="row" justifyContent="center" alignItems="center">
        <Button colorScheme="red" onClick={onOpen}>
          Remove Startup
        </Button>
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={() => {
          onDelete();
          router.back();
        }}
        company={company}
      />
    </CardContainer>
  );
};

export default DeleteCard;
