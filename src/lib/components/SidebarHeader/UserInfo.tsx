import { ArrowBackIcon, EditIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "lib/hooks/useUser";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import React from "react";
import { BiBuildings } from "react-icons/bi";
import { MdFeedback, MdSettings, MdWifi } from "react-icons/md";
import Entity from "../Entity/Entity";
import InternetAccessModal from "../Modals/InternetAccessModal";
import UserModal from "../Modals/UserModal";

const avatarSize = ["30px", "30px", "30px", "40px"];

const UserInfo: React.FC = () => {
  // Redux
  const { user } = useUser();

  // Auth
  const { signOutAction } = useAuth();

  // Color Mode
  const { toggleColorMode, colorMode } = useColorMode();

  // Internet Modal
  const {
    isOpen: isInternetOpen,
    onClose: onCloseInternet,
    onOpen: onOpenInternet,
  } = useDisclosure();

  // Profile Modal
  const {
    isOpen: isProfileOpen,
    onClose: onCloseProfile,
    onOpen: onOpenProfile,
  } = useDisclosure();

  if (!user) {
    return (
      <Stack direction="row">
        <Skeleton boxSize={avatarSize} />
        <Flex
          justifyContent="center"
          direction="column"
          display={["none", "none", "none", "flex"]}
        >
          <Skeleton h="20px" w="full" />
          <Skeleton h="20px" w="full" />
        </Flex>
      </Stack>
    );
  }

  const { firstName, lastName, profilePictureURL, position } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Stack
      direction={["column", "column", "column", "row"]}
      alignItems="center"
      justifyContent="space-between"
      spacing={4}
      pt="4"
    >
      <Entity
        imageUrl={profilePictureURL}
        title={fullName}
        sublabel={position}
        shrink
      />
      <Menu placement="top">
        <MenuButton>
          <MdSettings fontSize={20} />
        </MenuButton>
        <MenuList>
          <MenuGroup>
            <MenuItem onClick={toggleColorMode}>
              <HStack>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                <Text>Change Theme</Text>
              </HStack>
            </MenuItem>
            <MenuItem onClick={onOpenProfile}>
              <HStack>
                <EditIcon />
                <Text>Edit Profile</Text>
              </HStack>
            </MenuItem>
            <MenuItem onClick={onOpenInternet}>
              <HStack>
                <MdWifi />
                <Text>Internet Access</Text>
              </HStack>
            </MenuItem>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfTs86QJWS5FgUcWMhFE0Y5FNbR2gM0rqIJH1-rSDTRuxG7pg/viewform?embedded=true"
              target="_blank"
            >
              <MenuItem>
                <HStack>
                  <BiBuildings />
                  <Text>Building Access</Text>
                </HStack>
              </MenuItem>
            </Link>
            <Link href="mailto:rockethub@entrepreneur-club.org?subject=Rockethub%20Platform%20Feedback">
              <MenuItem>
                <HStack>
                  <MdFeedback />
                  <Text>Feedback</Text>
                </HStack>
              </MenuItem>
            </Link>
            <MenuItem onClick={signOutAction}>
              <HStack>
                <ArrowBackIcon />
                <Text>Logout</Text>
              </HStack>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <UserModal isOpen={isProfileOpen} onClose={onCloseProfile} />
      <InternetAccessModal isOpen={isInternetOpen} onClose={onCloseInternet} />
    </Stack>
  );
};

export default UserInfo;
