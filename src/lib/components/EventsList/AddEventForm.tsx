import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImageSelector } from "./ImageSelector";

interface Props {
  onFinish: () => void;
}

export const AddEventForm: React.FC<Props> = ({ onFinish }) => {
  const { addEvent } = useFirestore();

  // * form data
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");

  // * form validation
  const [isComplete, setIsComplete] = useState(false);
  const checkFormCompletion = useCallback(() => {
    return title.length > 0 && date && link.length > 0 && imageUrl.length > 0;
  }, [title, date, link, imageUrl]);

  useEffect(() => {
    setIsComplete(checkFormCompletion());
  }, [checkFormCompletion]);

  return (
    <Stack direction="column" w="full" h="full" overflow="auto" padding={3}>
      <Heading fontSize="lg">Add Event</Heading>
      <FormControl isRequired>
        <FormLabel>Date </FormLabel>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={date}
          onChange={(newDate: Date) => setDate(newDate)}
          customInput={<Input variant="filled" />}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          variant="filled"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          variant="filled"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Location</FormLabel>
        <Input
          variant="filled"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Application Link</FormLabel>
        <Input
          variant="filled"
          defaultValue={link}
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
        <FormHelperText>e.g. Eventbrite Link</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Image</FormLabel>
        <ImageSelector
          images={[
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
            "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80",
            "https://images.unsplash.com/photo-1598520106830-8c45c2035460?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
          ]}
          selectedImage={imageUrl}
          onClick={setImageUrl}
        />
      </FormControl>

      <Stack direction="row" w="full" paddingTop={5}>
        <Button
          disabled={!isComplete}
          variant="solid"
          w="full"
          onClick={() => {
            addEvent({
              timestamp: new Date(date).getTime(),
              title,
              description,
              link,
              location,
              imageUrl,
            })
              .then(() => {
                onFinish();
              })
              .catch((err) => {
                console.log("Error adding the event.", err);
              });
          }}
        >
          Create
        </Button>
      </Stack>
    </Stack>
  );
};
