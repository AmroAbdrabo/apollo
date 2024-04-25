import { Heading, Stack } from "@chakra-ui/react";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import React from "react";
import { Database } from "../../../../shared/types";
import { AddEvent, Event } from "./Event";

interface Props {
  events: Database.EventType[];
}

export const EventsList: React.FC<Props> = ({ events }) => {
  const { userGroup } = useAuth();
  if (events.length === 0 && userGroup !== "admin") return null;
  return (
    <Stack direction="column">
      <Heading size="md">Upcoming Events</Heading>
      <Stack direction="row" w="full" overflow="auto" spacing="15px">
        {userGroup === "admin" && <AddEvent />}
        {events.map((event) => (
          <Event key={JSON.stringify(event)} event={event} />
        ))}
      </Stack>
    </Stack>
  );
};
