import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Database } from "../../../../shared/types";

interface Props {
  meetingRoom: Database.MeetingRoomType;
}

export const MeetingRoom: React.FC<Props> = ({ meetingRoom }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const bgColor2 = useColorModeValue("#white", "gray.600");
  return (
    <Box borderRadius="lg" overflow="hidden" bg={bgColor} boxShadow="md">
      {!meetingRoom.imageUrl && (
        <Text fontWeight={1000} align="center" p={20} bg={bgColor2}>
          No image
        </Text>
      )}
      {meetingRoom.imageUrl && (
        <Image
          alt="Picture of the meeting room"
          src={meetingRoom.imageUrl}
          h="200px"
          w="full"
          objectFit="cover"
        />
      )}
      <Box p={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontWeight={600}
          >{`${meetingRoom.buildingName} ${meetingRoom.name}`}</Text>
          <Link href={meetingRoom.bookingLink} passHref>
            <Button fontSize="md">Book</Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};
