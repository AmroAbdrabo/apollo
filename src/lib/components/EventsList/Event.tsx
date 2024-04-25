import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { Database } from "../../../../shared/types";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { AddEventForm } from "./AddEventForm";
import { DateTile } from "./DateTile";

interface Props {
  event: Database.EventType;
}

export const Event: React.FC<Props> = ({ event }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userGroup } = useAuth();
  const { deleteEventWithId } = useFirestore();

  const { colorMode } = useColorMode();

  const lightMode = colorMode === "light";

  const isAdmin = userGroup === "admin";

  return (
    <Flex
      minW="200px"
      minH="200px"
      direction="column"
      overflow="hidden"
      borderRadius={10}
      cursor="pointer"
      onClick={() => setModalVisible(true)}
    >
      <Box
        minHeight="120px"
        height="100%"
        bgPos="bottom"
        bg={`url(${event.imageUrl})`}
        bgSize="cover"
        bgRepeat="no-repeat"
        objectFit="cover"
        pos="relative"
      >
        <DateTile timestamp={event.timestamp} />
      </Box>
      <Box bg={lightMode ? "white" : "gray.700"} padding="15px">
        <Text
          fontSize={14}
          fontWeight={600}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {event.title}
        </Text>
        <Flex direction="row" alignItems="center" color="gray">
          <HiLocationMarker />
          <Text marginLeft="5px" fontSize={14}>
            {event.location}
          </Text>
        </Flex>
      </Box>
      <Modal onClose={() => setModalVisible(false)} isOpen={modalVisible}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" overflow="hidden">
          <ModalCloseButton />
          <Box
            bg={`url(${event.imageUrl})`}
            height={250}
            bgSize="cover"
            objectFit="cover"
            bgRepeat="no-repeat"
            bgPos="center"
            pos="relative"
          >
            {isAdmin && (
              <DeleteButton
                onClick={() => {
                  deleteEventWithId(event.id);
                  setModalVisible(false);
                  // TODO: remove once snapshots are implemented @jonas
                  setTimeout(() => {
                    window.location.reload();
                  }, 300);
                }}
              />
            )}
            <DateTile timestamp={event.timestamp} />
          </Box>
          <Box padding="15px">
            <Text fontWeight={600}>{event.title}</Text>
            <Text>{event.description}</Text>
            <Flex direction="row" alignItems="center" color="gray">
              <HiLocationMarker />
              <Text marginLeft="5px" fontSize={14}>
                {event.location}
              </Text>
            </Flex>
            <Flex justifyContent="flex-end">
              <Button onClick={() => window.open(event.link, "_blank")}>
                Apply
              </Button>
            </Flex>
          </Box>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export const AddEvent: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";
  return (
    <Flex
      minW="200px"
      minHeight="200px"
      direction="column"
      overflow="hidden"
      borderRadius={10}
      cursor="pointer"
      onClick={() => setModalVisible(true)}
    >
      <Flex
        bg={lightMode ? "#ffffff" : "gray.700"}
        padding="15px"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <AddIcon fontSize={25} />
      </Flex>
      <Modal onClose={() => setModalVisible(false)} isOpen={modalVisible}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" overflow="hidden" padding={5}>
          <ModalCloseButton />
          <AddEventForm onFinish={() => setModalVisible(false)} />
        </ModalContent>
      </Modal>
    </Flex>
  );
};

interface AddEventProps {
  onClick: () => void;
}

export const AddEventButton: React.FC<AddEventProps> = ({ onClick }) => {
  return (
    <Center
      minWidth="180px"
      minHeight="300px"
      bgColor="teal"
      padding={4}
      borderRadius={10}
      color="white"
      onClick={onClick}
      cursor="pointer"
    >
      <AddIcon />
    </Center>
  );
};
