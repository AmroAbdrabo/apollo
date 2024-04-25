import { AspectRatio, Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Database } from "../../../../shared/types";
import { Socials } from "../Socials/Socials";

interface Props {
  member: Database.UserType;
  companyName?: string;
  size?: number;
}

export const MemberCell: React.FC<Props> = ({ member, companyName }) => {
  const fullName = `${member.firstName} ${member.lastName}`;

  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";

  return (
    <Box
      bgColor={lightMode ? "white" : "gray.700"}
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
    >
      <Box pos="relative">
        <AspectRatio ratio={1} w="full">
          <Avatar
            src={member.profilePictureURL}
            name={fullName}
            bgPos="center"
            borderRadius={0}
            objectFit="cover"
            w="full"
            h="full"
          />
        </AspectRatio>
        {member?.linkedInURL && (
          <Box position="absolute" bottom="10px" right="10px">
            <Socials logo={<FaLinkedinIn />} link={member.linkedInURL} />
          </Box>
        )}
      </Box>
      <Box p={2}>
        <Text
          fontSize={fullName.length > 19 ? 14 : 16}
          fontWeight={600}
          textAlign="center"
        >
          {fullName}
        </Text>
        {companyName && (
          <Text fontSize={14} textAlign="center">
            {member.position} @{" "}
            <Text as="b" textTransform="uppercase">
              {companyName}
            </Text>
          </Text>
        )}
      </Box>
    </Box>
  );
};
