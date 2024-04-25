import { Avatar, Box, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { Database } from "../../../../shared/types";

interface Props {
  company: Database.CompanyType | Database.SupporterType | null;
}

const CompanyHeader: React.FC<Props> = ({ company }) => {
  if (!company) {
    return <Skeleton boxSize="100px" bg="white" borderRadius="md" />;
  }

  const { name, imageSource, category } = company;

  return (
    <Stack spacing={5} alignItems="center" direction={["column", "row"]}>
      <Avatar
        src={imageSource}
        name={name}
        boxSize="100px"
        bg="white"
        borderRadius="md"
      />
      <Box textAlign={["center", "left"]}>
        <Heading size="lg">{name}</Heading>
        <Heading size="md" color="teal">
          {category}
        </Heading>
      </Box>
    </Stack>
  );
};

export default CompanyHeader;
