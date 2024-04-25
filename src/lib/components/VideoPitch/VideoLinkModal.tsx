import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useToast,
} from "@chakra-ui/react";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  url: string;
}

interface Props {
  companyId: string | null;
}

const VideoLinkModal: React.FC<Omit<ModalProps, "children"> & Props> = ({
  isOpen,
  onClose,
  companyId,
}) => {
  const { updateCompanyWithId } = useFirestore();

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    ({ url }) => {
      if (!companyId) {
        toast({
          title: "Error",
          description: "Failed to update video url. Company not found.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      updateCompanyWithId(companyId, { pitchUrl: url }).catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    },
    [companyId, toast, updateCompanyWithId]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Video Pitch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={Boolean(errors.url)}>
              <FormLabel>Link</FormLabel>
              <Input
                type="url"
                placeholder="https://"
                {...register("url", { required: "A link is required." })}
              />
              <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default VideoLinkModal;
