import {
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Notification from "lib/components/Notification/Notification";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import useGuard from "lib/modules/routing/useGuard";
import {
  VPOperationsImageUrl,
  VPOperationsName,
} from "lib/shared/sharedConstants";
import { NextPageWithLayout } from "pages/_app";
import { Loading } from "../Loading/Loading";

const Inbox: NextPageWithLayout = () => {
  const { isLoading } = useGuard(true, "/landing");
  useAuth();

  if (isLoading) return <Loading />;

  return (
    <Stack w="full">
      <Heading size="md">Inbox</Heading>
      <Notification
        timestamp={1655580053406}
        category="Onboarding"
        title="How to get internet access"
        authorImageUrl={VPOperationsImageUrl}
        authorName={VPOperationsName}
      >
        <Text>
          For non-ETH members, internet can be requested by clicking on the gear
          icon in the left bottom corner. ETH members can use their usual ETH
          Internet Login to gain internet access.
        </Text>
      </Notification>
      <Notification
        timestamp={1655580053406}
        category="Onboarding"
        title="Getting your wall plaque"
        authorImageUrl={VPOperationsImageUrl}
        authorName={VPOperationsName}
      >
        <Text>
          Click on your company name in the top left corner. You will find a
          template for a wall plaque. Download it and upload your customized
          version.
        </Text>
      </Notification>
      <Notification
        timestamp={1655580053406}
        category="Onboarding"
        title="Rockethub Rules"
        authorImageUrl={VPOperationsImageUrl}
        authorName={VPOperationsName}
      >
        <UnorderedList>
          <ListItem>
            Be friendly and engage in the community (e.g. by attending events,
            collaborating etc.)
          </ListItem>
          <ListItem>
            Always clean up every room (office rooms, shared spaces & kitchen)
            after using it. This involves a strict clean desk policy, so do not
            leave personal belongings but put them in locker.
          </ListItem>
          <ListItem>
            Label your food / drinks when putting them in the refrigerator.
          </ListItem>
          <ListItem>
            Give prompt notice to the EC’s VP of Operations of any defects or
            issues at the co-working space, which need to be fixed.
          </ListItem>
          <ListItem>
            If you are the last one leaving the Rockethub, make sure all lights
            are turned off, and windows closed.
          </ListItem>
        </UnorderedList>
      </Notification>
    </Stack>
  );
};

Inbox.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default Inbox;
