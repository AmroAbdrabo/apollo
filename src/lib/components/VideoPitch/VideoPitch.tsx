import {
  AspectRatio,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";
import { Database } from "../../../../shared/types";
import CardContainer from "../CardContainer/CardContainer";
import VideoLinkModal from "./VideoLinkModal";

interface Props {
  company: Database.CompanyType | undefined | null;
}

const VideoPitch: React.FC<Props> = ({ company }) => {
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!company?.pitchUrl) {
    return (
      <CardContainer>
        <Heading size="sm">Video Pitch</Heading>
        <Text>You have not yet added your video pitch.</Text>
        <Text>
          The video pitch is intended for Rockethub Supporters and VCs to
          quickly get an overview of your startup.
        </Text>
        <Text>Reach out to operations to get your video pitch captured.</Text>
        <Flex justifyContent="flex-end">
          <Button colorScheme="teal" onClick={onOpen}>
            Add Link
          </Button>
        </Flex>
        <VideoLinkModal
          isOpen={isOpen}
          onClose={onClose}
          companyId={company?.id ?? null}
        />
      </CardContainer>
    );
  }
  return (
    <AspectRatio
      maxH="400px"
      ratio={16 / 9}
      borderRadius="xl"
      overflow="hidden"
    >
      <ReactPlayer
        url={company.pitchUrl}
        width="100%"
        height="100%"
        style={{ overflow: "hidden" }}
      />
    </AspectRatio>
  );
};

export default VideoPitch;
