import {
  Avatar,
  Button,
  ButtonGroup,
  Heading,
  Link as ChakraLink,
  Tag,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Database } from "../../../../shared/types";

interface Props {
  mentor: Database.MentorType;
}

export const MentorCell: React.FC<Props> = ({ mentor }) => {
  const {
    imageUrl,
    expertiseAreas,
    id,
    firstName,
    lastName,
    position,
    linkedinUrl,
  } = mentor;

  const fullName = `${firstName} ${lastName}`;

  return (
    <VStack
      justifyContent="space-between"
      bgColor={useColorModeValue("white", "gray.700")}
      boxShadow="md"
      px={3}
      py={5}
      borderRadius="xl"
    >
      <VStack spacing={2}>
        <Avatar size="xl" src={imageUrl} name={fullName} />
        <Heading size="md">{fullName}</Heading>
        <Text textAlign="center">{position}</Text>
        <Wrap justify="center">
          {expertiseAreas.slice(0, 2).map((area) => {
            return <Tag key={area}>{area}</Tag>;
          })}
          {expertiseAreas.length > 3 && (
            <Tag>{`+ ${expertiseAreas.length - 2} more`}</Tag>
          )}
        </Wrap>
      </VStack>
      <ButtonGroup>
        <ChakraLink href={linkedinUrl} target="_blank">
          <Button w="full" isDisabled={!linkedinUrl}>
            LinkedIn
          </Button>
        </ChakraLink>
        <Link href={`/mentor/${id}`} passHref>
          <Button w="full">More Info</Button>
        </Link>
      </ButtonGroup>
    </VStack>
  );
};
