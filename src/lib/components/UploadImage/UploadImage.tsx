import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useStorage } from "lib/modules/firebase/firebaseStorage";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

interface Props {
  title: string;
  filePath: string;
  isPrefixPath: boolean;
  setUrl: (url: string) => void;
}

/**
 * @param {isPrefixPath} boolean - if true, uuidv4() will be added to the filePath
 */
export const UploadImage: React.FC<Props> = ({
  title,
  filePath,
  isPrefixPath,
  setUrl,
}) => {
  const { uploadFile, getURL } = useStorage();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    let path = filePath;
    if (isPrefixPath) {
      path = `${filePath}/${uuidv4()}`;
    }

    setIsLoading(true);
    try {
      const success = await uploadFile(path, acceptedFiles[0]);
      if (success) {
        getURL(path).then((url) => {
          setUrl(url);
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to upload file",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to upload file",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxFiles: 1,
    maxSize: 1000000,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          toast({
            status: "error",
            title: "File Rejected",
            description: error.message,
            duration: 5000,
            isClosable: true,
          });
        });
      });
    },
  });
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Button {...getRootProps()} colorScheme="teal" isLoading={isLoading}>
        <input {...getInputProps()} type="file" />
        Upload
      </Button>
      <FormHelperText>JPG, PNG, 800x800, 1MB</FormHelperText>
    </FormControl>
  );
};
