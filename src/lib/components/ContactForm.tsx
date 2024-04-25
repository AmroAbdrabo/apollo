import { Box, Button } from "@chakra-ui/react";
import React from "react";

interface Props {
  email: string;
  subject: string;
  label: string;
  ccEmail?: string;
  body?: string;
}

export const ContactForm: React.FC<Props> = ({
  email,
  subject,
  label,
  ccEmail,
  body,
}) => {
  const bodyValue = body ?? "";
  const ccEmailValue = ccEmail ?? "";
  return (
    <Box>
      <Button>
        <a
          href={`mailto:${email}?subject=${subject}&body=${bodyValue}&cc=${ccEmailValue}`}
        >
          {label}
        </a>
      </Button>
    </Box>
  );
};
