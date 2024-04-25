import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { MeetingRoom } from "lib/components/Room/MeetingRoom";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { getMeetingRooms } from "lib/modules/firebase/firebaseFirestore";
import useGuard from "lib/modules/routing/useGuard";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";

interface Props {
  rooms: Database.MeetingRoomType[];
}

const RoomBooking = ({
  rooms,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isLoading } = useGuard(true, "/landing");
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Loading />;

  return (
    <Box w="full">
      <Stack direction="row">
        <Button
          leftIcon={<InfoIcon />}
          colorScheme="blue"
          m="3"
          onClick={onOpen}
        >
          Info
        </Button>
      </Stack>
      <SimpleGrid spacing={4} minChildWidth="200px">
        {rooms?.map((meetingRoom) => {
          return <MeetingRoom key={meetingRoom.id} meetingRoom={meetingRoom} />;
        })}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent h="full">
          <ModalHeader>Room Booking Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* TODO: @dennis Update with new link */}
            <iframe
              title="document"
              src="https://drive.google.com/file/d/1vjKYz4zllKT1uKbcbeJV5bSLohGgCjbs/preview"
              width="100%"
              height="100%"
            >
              Loading…
            </iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

RoomBooking.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  let rooms: Database.MeetingRoomType[] = [];
  try {
    rooms = await getMeetingRooms();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      rooms,
    },
  };
};

export default RoomBooking;
