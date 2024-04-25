import { AddIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MultiSelectionFilter } from "lib/components/Filter/MultiSelectionFilter";
import { Sidebar } from "lib/components/Sidebar/Sidebar";
import SupporterCard from "lib/components/SupporterCard/SupporterCard";
import { useAuth } from "lib/modules/firebase/firebaseProvider";
import useGuard from "lib/modules/routing/useGuard";
import { NextPageWithLayout } from "pages/_app";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { generalSelector } from "redux/slices/generalSlice";
import { Database } from "../../../../shared/types";
import { Loading } from "../Loading/Loading";
import { EditSupporterDetailView } from "../SupporterDetailView/EditSupporterDetailView";

const Supporters: NextPageWithLayout = () => {
  // guarded route -> redirect to /login if authentication is missing
  const { isLoading } = useGuard(true, "/landing");

  const { supporters } = useAppSelector(generalSelector);

  const [addSupporterModalVisible, setAddSupporterModalVisible] =
    useState(false);

  const {
    isOpen: isHelpOpen,
    onClose: onCloseHelp,
    onOpen: onOpenHelp,
  } = useDisclosure();

  const { userGroup } = useAuth();

  const [filter, setFilter] = useState<Database.SupporterCategory[]>([]);
  const [categories, setCategories] = useState<Database.SupporterCategory[]>(
    []
  );

  const [filteredSupporters, setFilteredSupporters] =
    useState<Database.SupporterType[]>();

  useEffect(() => {
    const newCategories: Database.SupporterCategory[] = [];
    supporters.forEach((supporter) => {
      if (!newCategories.includes(supporter.category)) {
        newCategories.push(supporter.category);
      }
    });
    setCategories(newCategories);
  }, [supporters]);

  useEffect(() => {
    if (filter.length > 0 && supporters) {
      setFilteredSupporters(
        supporters.filter((s) => filter.includes(s.category))
      );
    } else {
      setFilteredSupporters(supporters);
    }
  }, [filter, supporters]);

  if (isLoading || !filteredSupporters) return <Loading />;

  return (
    <Stack pos="relative" w="full" spacing={5}>
      <Heading size="md">Supporters</Heading>
      <Stack
        direction={["column", "column", "row"]}
        justifyContent="space-between"
      >
        <MultiSelectionFilter
          label="Category Filter"
          values={categories}
          setFilter={(values) => setFilter(values)}
        />
        <HStack>
          <IconButton
            w="full"
            aria-label="help"
            onClick={onOpenHelp}
            icon={<QuestionIcon />}
          />
          {userGroup === "admin" && (
            <IconButton
              onClick={() => setAddSupporterModalVisible(true)}
              colorScheme="teal"
              aria-label="add-supporter"
              w="full"
              icon={<AddIcon />}
            />
          )}
        </HStack>
      </Stack>
      <SimpleGrid minChildWidth="250px" spacing={5}>
        {filteredSupporters.map((sup) => {
          return <SupporterCard key={sup.id} supporter={sup} />;
        })}
        <Flex w={2} />
        <Flex w={2} />
        <Flex w={2} />
        <Flex w={2} />
      </SimpleGrid>

      <Modal
        onClose={() => setAddSupporterModalVisible(false)}
        isOpen={addSupporterModalVisible}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Supporter</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={5}>
            <EditSupporterDetailView
              supporter={{
                id: "",
                category: "",
                desc: "",
                publicEmail: undefined,
                privateEmail: undefined,
                landingPage: undefined,
                imageSource: "",
                name: "",
                perks: [],
                isNew: true,
                used: 0,
              }}
              isNewSupporter
              backToOverview={() => setAddSupporterModalVisible(false)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseHelp} isOpen={isHelpOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What is the Supporters Program?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              The Rocket Hub enables access to exclusive discounts and free
              services to its members. With the Startup Supporter program, we
              connect our strategic partners with the startups in our incubator.
              So what are you waiting for, go ahead and check these offers out!
              And if you have any questions or something you need is missing:
              please just let us know.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseHelp}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

Supporters.getLayout = (page: React.ReactElement) => {
  return <Sidebar>{page}</Sidebar>;
};

export default Supporters;
