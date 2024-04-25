import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DeleteButton } from "lib/components/DeleteButton/DeleteButton";
import { TagInput } from "lib/components/TagInput/TagInput";
import { Tile } from "lib/components/Tile";
import { UploadImage } from "lib/components/UploadImage/UploadImage";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import {
  addLinkedinLinkToHandle,
  convertLinkedInLinkToHandle,
} from "lib/modules/utils/shared";
import { defaultImageURL } from "lib/shared/sharedConstants";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Database } from "../../../../shared/types";

const pathPrefix = "mentors";

interface Inputs {
  firstName: string;
  lastName: string;
  description: string;
  expertiseAreas: string[];
  position: string;
  publicEmail: string;
  linkedinHandle: string;
}

interface Props {
  mentor: Database.MentorType;
  backToOverview: () => void;
  isNewMentor?: boolean;
}

// TODO: @dennis add regex to verification
// const expression =
// eslint-disable-next-line no-useless-escape
// /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
// const regex = new RegExp(expression);

export const EditMentorDetailView: React.FC<Props> = ({
  mentor,
  isNewMentor,
  backToOverview,
}) => {
  const { updateMentor, deleteMentorWithId, addMentor } = useFirestore();
  const router = useRouter();

  // * Mentor data
  const [profilePictureURL, setProfilePictureURL] = useState(mentor?.imageUrl);

  // * Delete Confirmation
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [expertiseTags, setExpertiseTags] = useState<string[]>(
    mentor.expertiseAreas ?? []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      description: mentor.desc,
      expertiseAreas: mentor.expertiseAreas,
      position: mentor.position,
      publicEmail: mentor.publicEmail,
      linkedinHandle: mentor.linkedinUrl
        ? convertLinkedInLinkToHandle(mentor.linkedinUrl)
        : "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    firstName,
    lastName,
    description,
    position,
    publicEmail,
    linkedinHandle,
  }) => {
    const mentorId = mentor?.id || `${firstName}${lastName}`.toLowerCase();
    if (isNewMentor) {
      addMentor(mentorId, {
        firstName,
        lastName,
        desc: description,
        expertiseAreas: expertiseTags,
        position,
        publicEmail,
        imageUrl: profilePictureURL,
        linkedinUrl: addLinkedinLinkToHandle(linkedinHandle),
      })
        .then(() => {
          backToOverview();
        })
        .catch((err) => {
          console.error("Failed to add mentor: ", err);
        });
    } else {
      updateMentor(mentorId, {
        firstName,
        lastName,
        desc: description,
        expertiseAreas: expertiseTags,
        position,
        publicEmail,
        imageUrl: profilePictureURL ?? "",
        linkedinUrl: addLinkedinLinkToHandle(linkedinHandle),
      })
        .then(() => {
          backToOverview();
        })
        .catch((err) => {
          console.error("Failed to update mentor: ", err);
        });
    }
  };

  const filePath = useMemo(
    () => `${pathPrefix}/${mentor.id ?? uuidv4()}/profilePicture`,
    [mentor]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {!isNewMentor && (
          <DeleteButton
            onClick={() => setDeleteModalVisible(!deleteModalVisible)}
          />
        )}
        <Stack direction="row" alignItems="center" spacing={5}>
          <Tile
            name=""
            imageURL={profilePictureURL || defaultImageURL}
            onClick={() => null}
          />
          <UploadImage
            title="Mentor Profile Picture"
            filePath={filePath}
            setUrl={(url) => setProfilePictureURL(url)}
            isPrefixPath={false}
          />
        </Stack>

        {/* First Name */}
        <FormControl isInvalid={Boolean(errors.firstName)}>
          <FormLabel>First Name</FormLabel>
          <Input
            variant="filled"
            {...register("firstName", {
              required: "A first name is required.",
            })}
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        {/* Last Name */}
        <FormControl isInvalid={Boolean(errors.lastName)}>
          <FormLabel>Last Name</FormLabel>
          <Input
            variant="filled"
            {...register("lastName", { required: "A last name is required." })}
          />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>

        {/* Description */}
        <FormControl isInvalid={Boolean(errors.description)}>
          <FormLabel>Description</FormLabel>
          <Input
            variant="filled"
            {...register("description", {
              required: "A description is required.",
            })}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        {/* Expertise Areas */}
        <TagInput
          formLabel="Areas of Expertise"
          tags={expertiseTags}
          setTags={setExpertiseTags}
        />

        {/* Position */}
        <FormControl isInvalid={Boolean(errors.position)}>
          <FormLabel>Position</FormLabel>
          <Input
            variant="filled"
            {...register("position", { required: "A position is required." })}
          />
          <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
        </FormControl>

        {/* Public Email */}
        <FormControl>
          <FormLabel>Public Email</FormLabel>
          <Input
            variant="filled"
            {...register("publicEmail", {
              required: "An email is required where startups can reach you.",
            })}
          />
          <FormHelperText>
            Email used by startups to contact mentors
          </FormHelperText>
          <FormErrorMessage>{errors.publicEmail?.message}</FormErrorMessage>
        </FormControl>

        {/* LinkedIn URL */}
        <FormControl>
          <FormLabel>LinkedIn</FormLabel>
          <InputGroup>
            <InputLeftAddon>linkedin.com/in/</InputLeftAddon>
            <Input variant="filled" {...register("linkedinHandle")} />
          </InputGroup>
          <FormHelperText>
            Add your LinkedIn handle, e.g elonmusk
          </FormHelperText>
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
          <Button variant="solid" w="full" type="submit">
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
                <Text>
                  Are you sure you want to delete this mentor from the
                  Mentorship Program?
                </Text>
                <Text>
                  This action cannot be undone and has to be signed of by the VP
                  of Operations.
                </Text>
                <FormControl>
                  <FormLabel>Confirm</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="Mentor"
                    onChange={(event) => setDeleteInput(event.target.value)}
                  />
                  <FormHelperText>Type in Mentor to confirm</FormHelperText>
                </FormControl>
                <Button
                  colorScheme="red"
                  disabled={deleteInput !== "Mentor"}
                  onClick={() => {
                    deleteMentorWithId(mentor.id);
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
    </form>
  );
};
