import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Stack,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import { useCallback, useState } from "react";
import { Database } from "../../../../shared/types";

interface Props {
  company: Database.CompanyType | null;
  onDelete: () => void;
}

const DeleteModal: React.FC<Omit<ModalProps, "children"> & Props> = ({
  isOpen,
  onClose,
  onDelete,
  company,
}) => {
  const { updateCompanyWithId } = useFirestore();

  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteStartup = useCallback(() => {
    // This is just a sanity check. Since the button is disabled if the name does not match, this check should always succeed.
    if (company?.name.toUpperCase() === deleteInput) {
      setIsDeleting(true);
      updateCompanyWithId(company.id, { status: "inactive" }).then(() => {
        onDelete();
        setIsDeleting(false);
      });
    }
  }, [company, updateCompanyWithId, deleteInput, onDelete]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text>
              Are you sure you want to remove this startup from the RocketHub?
            </Text>
            <Text>
              This action cannot be undone and has to be signed of by the VP of
              Operations.
            </Text>
            <FormControl>
              <FormLabel>Confirm</FormLabel>
              <Input
                variant="filled"
                placeholder={company?.name.toUpperCase()}
                onChange={(event) => {
                  setDeleteInput(event.target.value);
                }}
              />
              <FormHelperText>
                Type in {company?.name.toUpperCase()} to confirm
              </FormHelperText>
            </FormControl>
            <Button
              colorScheme="red"
              disabled={deleteInput !== company?.name.toUpperCase()}
              onClick={deleteStartup}
              isLoading={isDeleting}
            >
              Confirm
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
