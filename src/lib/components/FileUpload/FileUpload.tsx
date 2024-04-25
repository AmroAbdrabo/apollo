import { Flex, FlexProps, useToast } from "@chakra-ui/react";
import { useStorage } from "lib/modules/firebase/firebaseStorage";
import React, { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

interface Props {
  filePath: string;
  isPrefixPath: boolean;
  acceptedFiles: Accept;
  setUrl: (url: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

/**
 * @param {isPrefixPath} boolean - if true, uuidv4() will be added to the filePath
 */
const FileUpload: React.FC<Props & FlexProps> = ({
  filePath,
  isPrefixPath,
  acceptedFiles,
  setUrl,
  children,
  setIsLoading,
  ...props
}) => {
  const { uploadFile, getURL } = useStorage();

  const toast = useToast();

  const onDrop = useCallback(
    async (files) => {
      console.log(files);
      if (files.length === 0) {
        toast({
          title: "Error",
          description: "File not recognizable. Please reach out to operations.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      let path = filePath;
      if (isPrefixPath) {
        path = `${filePath}/${uuidv4()}`;
      }

      setIsLoading(true);
      try {
        const success = await uploadFile(path, files[0]);
        if (success) {
          getURL(path)
            .then((url) => {
              setUrl(url);
              toast({
                title: "Success",
                description: "Your file upload was successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            })
            .catch((err) => {
              toast({
                title: "Error",
                description: err,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
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
    },
    [filePath, getURL, isPrefixPath, setIsLoading, setUrl, toast, uploadFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    maxFiles: 1,
    maxSize: 1000000,
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return (
    <Flex {...getRootProps()} {...props}>
      <input {...getInputProps()} type="file" />
      {children}
    </Flex>
  );
};

export default FileUpload;
