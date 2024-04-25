import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { DeleteButton } from "lib/components/DeleteButton/DeleteButton";
import { Tile } from "lib/components/Tile";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import { useStorage } from "lib/modules/firebase/firebaseStorage";
import { defaultImageURL, getBase64FromFile } from "lib/shared/sharedConstants";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Database } from "../../../../shared/types";
import { Perk } from "./Components/Perk";

const importErrorMessage =
  "Files must be smaller than 10MB & of right file type.";

const supporterLogoFilePathPrefix = "supportersprogram";

interface Props {
  supporter: Database.SupporterType;
  backToOverview: () => void;
  isNewSupporter?: boolean;
}

const expression =
  // eslint-disable-next-line no-useless-escape
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);

export const EditSupporterDetailView: React.FC<Props> = ({
  supporter,
  isNewSupporter,
  backToOverview,
}) => {
  const { updateSupporter, deleteSupporterWithId, addSupporter } =
    useFirestore();
  const { uploadFile, getURL } = useStorage();
  const router = useRouter();

  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";

  // * Supporter Metadata
  const [supporterName, setSuppoterName] = useState(
    supporter.name ?? "Supporter"
  );
  const [description, setDescription] = useState(supporter.desc ?? "");
  const [category, setCategory] = useState(supporter.category || "Funding");
  const [imageSource, setImageSource] = useState(supporter.imageSource ?? "");

  // * Emails and Links
  const [privateEmail, setPrivateEmail] = useState(
    supporter?.privateEmail ?? ""
  );
  const [publicEmail, setPublicEmail] = useState(supporter?.privateEmail ?? "");
  const [landingPage, setLandingPage] = useState(supporter?.landingPage ?? "");

  // * Data for new perk
  const [newPerkTitle, setNewPerkTitle] = useState("");
  const [newPerkDescription, setNewPerkDescription] = useState("");

  // * Current Perks
  const [perks, setPerks] = useState(supporter?.perks ?? []);

  // * Regex
  const [isRegexError, setIsRegexError] = useState(false);

  // * Import
  const [imageImportErrorMessage, setImportImageErrorMessage] =
    useState<string>();
  const [supporterLogoFile, setSupporterLogoFile] = useState<File>();

  // * Delete Confirmation
  const [deleteInput, setDelteInput] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deletePerk = (index: number) => {
    if (perks) {
      const currentPerks = [...perks];
      currentPerks?.splice(index, 1);
      setPerks(currentPerks);
    }
  };

  const addPerk = () => {
    if (!newPerkTitle && !newPerkDescription) return;
    let currentPerks: Database.PerkType[] = [];
    const newPerk: Database.PerkType = {
      title: newPerkTitle,
      description: newPerkDescription,
    };
    if (perks) {
      currentPerks = perks;
    }
    currentPerks?.push(newPerk);
    setPerks(currentPerks);
    setNewPerkTitle("");
    setNewPerkDescription("");
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setImportImageErrorMessage(importErrorMessage);
      return;
    }
    setImportImageErrorMessage(undefined);
    setSupporterLogoFile(acceptedFiles[0]);
    getBase64FromFile(acceptedFiles[0]).then((base64) => {
      if (typeof base64 === "string") {
        setImageSource(base64);
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", "jpg", ".png"],
    },
    maxFiles: 1,
    maxSize: 1000000,
  });

  return (
    <Stack
      direction="column"
      w="full"
      h="full"
      overflow="auto"
      maxWidth={1000}
      padding="0px 10px"
      margin="0px auto"
      position="relative"
      paddingBottom={2}
    >
      {!isNewSupporter && (
        <DeleteButton
          onClick={() => setDeleteModalVisible(!deleteModalVisible)}
        />
      )}
      <FormControl isInvalid={Boolean(imageImportErrorMessage)}>
        <FormLabel>Supporter Logo</FormLabel>
        <Stack direction="row" alignItems="center" spacing={5}>
          <Tile
            name=""
            imageURL={imageSource || defaultImageURL}
            onClick={() => null}
          />
          <Box>
            <Button {...getRootProps()} colorScheme="teal">
              <input {...getInputProps()} type="file" />
              {supporterLogoFile ? "Replace" : "Upload"}
            </Button>
            {imageImportErrorMessage && (
              <FormErrorMessage>{imageImportErrorMessage}</FormErrorMessage>
            )}
            {supporterLogoFile && (
              <FormHelperText color="teal">
                {supporterLogoFile.name}
              </FormHelperText>
            )}
            <FormHelperText>Supported Files: .jpg, .jpeg, .png</FormHelperText>
            <FormHelperText>Ideal Resolution: 500x500</FormHelperText>
          </Box>
        </Stack>
      </FormControl>
      <FormControl>
        <FormLabel>Supporter Name</FormLabel>
        <Input
          variant="filled"
          defaultValue={supporterName}
          onChange={(event) => {
            setSuppoterName(event.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          variant="filled"
          defaultValue={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          {Database.supporterCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          variant="filled"
          defaultValue={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Private Email</FormLabel>
        <Input
          variant="filled"
          defaultValue={privateEmail}
          onChange={(event) => {
            setPrivateEmail(event.target.value);
          }}
        />
        <FormHelperText>
          Email used for internal communication, only visible to Operations
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Public Email</FormLabel>
        <Input
          variant="filled"
          defaultValue={publicEmail}
          onChange={(event) => {
            setPublicEmail(event.target.value);
          }}
        />
        <FormHelperText>
          Email used by startups to contact supporters
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={isRegexError}>
        <FormLabel>Landing Page</FormLabel>
        <Input
          variant="filled"
          defaultValue={landingPage}
          onChange={(event) => {
            setLandingPage(event.target.value);
            setIsRegexError(!regex.test(event.target.value));
          }}
        />
        {!isRegexError ? (
          <FormHelperText>Enter a link starting with https://</FormHelperText>
        ) : (
          <FormErrorMessage>Not a proper link.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Perks</FormLabel>
        <Stack direction="column">
          {perks?.map((perk, index) => (
            <Perk
              key={`${perk.title}${perk.description}`}
              title={perk.title}
              description={perk.description}
              lightMode={lightMode}
              deletePerk={() => deletePerk(index)}
            />
          ))}
        </Stack>
      </FormControl>
      <FormControl>
        <FormLabel>Add Perk</FormLabel>
        <Stack>
          <FormHelperText>Title</FormHelperText>
          <Input
            variant="filled"
            value={newPerkTitle}
            onChange={(event) => {
              setNewPerkTitle(event.target.value);
            }}
          />
          <FormHelperText>Description</FormHelperText>
          <Textarea
            variant="filled"
            value={newPerkDescription}
            onChange={(event) => {
              setNewPerkDescription(event.target.value);
            }}
          />
          <Button
            onClick={() => addPerk()}
            disabled={!(newPerkTitle && newPerkDescription)}
          >
            Add
          </Button>
        </Stack>
      </FormControl>
      <Stack direction="row" w="full" paddingTop={10}>
        <Button
          w="full"
          variant="ghost"
          onClick={() => {
            backToOverview();
          }}
        >
          Back
        </Button>
        <Button
          variant="solid"
          w="full"
          onClick={async () => {
            const filePath = `${supporterLogoFilePathPrefix}/${supporterName}`;
            let url = "";
            if (supporterLogoFile) {
              const uploadSuccessful = await uploadFile(
                filePath,
                supporterLogoFile
              );
              if (uploadSuccessful) {
                url = await getURL(filePath);
              } else {
                console.error("Upload failed");
              }
            }

            let supporterId = supporter.id;

            if (isNewSupporter) {
              supporterId = supporterName.replace(/\s/g, "").toLowerCase();
              addSupporter(supporterId, {
                name: supporterName,
                category: category,
                imageSource: url || imageSource,
                desc: description,
                privateEmail: privateEmail,
                publicEmail: publicEmail,
                landingPage: landingPage,
                perks: perks,
              })
                .then(() => {
                  backToOverview();
                })
                .catch((err) => {
                  console.error("Failed to add supporter", err);
                });
            } else {
              updateSupporter(supporterId, {
                name: supporterName,
                category: category,
                imageSource: url || imageSource,
                desc: description,
                privateEmail: privateEmail,
                publicEmail: publicEmail,
                landingPage: landingPage,
                perks: perks,
              })
                .then(() => {
                  backToOverview();
                })
                .catch((err) => {
                  console.error("Update failed", err);
                });
            }
          }}
        >
          Submit
        </Button>
      </Stack>
      <Modal
        onClose={() => setDeleteModalVisible(false)}
        isOpen={deleteModalVisible}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0px 30px 30px 30px">
            <Stack>
              <Text>{`Are you sure you want to delete ${supporterName} from the Supporters Program?`}</Text>
              <Text>
                This action cannot be undone and has to be signed of by the VP
                of Operations.
              </Text>
              <FormControl>
                <FormLabel>Confirm</FormLabel>
                <Input
                  variant="filled"
                  placeholder={supporterName}
                  onChange={(event) => setDelteInput(event.target.value)}
                />
                <FormHelperText>{`Type in ${supporterName} to confirm`}</FormHelperText>
              </FormControl>
              <Button
                colorScheme="red"
                disabled={supporterName !== deleteInput}
                onClick={() => {
                  deleteSupporterWithId(supporter.id);
                  router.back();
                }}
              >
                Confirm
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
