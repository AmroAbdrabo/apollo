import { Image, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {
  images: string[];
  selectedImage: string;
  onClick: (image: string) => void;
}

export const ImageSelector: React.FC<Props> = ({
  images,
  selectedImage,
  onClick,
}) => {
  return (
    <Stack w="full" direction="row" overflow="auto">
      {images.map((image) => {
        return (
          <Image
            alt="Example event image"
            key={image}
            src={image}
            minWidth="100px"
            minHeight="100px"
            width="100px"
            height="100px"
            objectFit="cover"
            borderRadius={10}
            cursor="pointer"
            onClick={() => onClick(image)}
            border={selectedImage === image ? "4px solid teal" : "none"}
            margin={0}
          />
        );
      })}
    </Stack>
  );
};
