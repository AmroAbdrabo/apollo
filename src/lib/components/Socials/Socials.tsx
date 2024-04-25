import { IconButton, IconButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface Props {
  logo: React.ReactElement;
  link: string;
}

export const Socials: React.FC<Props & Omit<IconButtonProps, "aria-label">> = ({
  logo,
  link,
  ...props
}) => {
  return (
    <Link href={link} passHref>
      <IconButton
        borderRadius="lg"
        icon={logo}
        colorScheme="linkedin"
        aria-label={link}
        {...props}
      />
    </Link>
  );
};
