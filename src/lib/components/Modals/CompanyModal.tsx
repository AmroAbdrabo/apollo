import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Select,
  Stack,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { useUserCompany } from "lib/hooks/useUserCompany";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import {
  contractTemplateUrl,
  wallPlaqueTemplateUrl,
} from "lib/shared/sharedConstants";
import React, { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Database } from "../../../../shared/types";
import Entity from "../Entity/Entity";
import FileUpload from "../FileUpload/FileUpload";
import { UploadImage } from "../UploadImage/UploadImage";

interface Inputs {
  name: string;
  category: Database.CompanyCategory;
  website: string;
  imageURL: string;
}

const CompanyModal: React.FC<Omit<ModalProps, "children">> = ({
  isOpen,
  onClose,
}) => {
  const { company, refetchCompany } = useUserCompany();

  // Paths
  const logoPath = useMemo(
    () => `/companies/${company?.id}/logo`,
    [company?.id]
  );
  const wallPlaquePath = useMemo(
    () => `/companies/${company?.id}/wall_plaque`,
    [company?.id]
  );
  const contractPath = useMemo(
    () => `/companies/${company?.id}/contract`,
    [company?.id]
  );

  // Firestore
  const { updateCompanyWithId, setContractUrlForId } = useFirestore();

  // Toast
  const toast = useToast();

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Wall Plaque and Contract Loading
  const [isUploadingWallPlaque, setIsUploadingWallPlaque] = useState(false);
  const [isUploadingContract, setIsUploadingContract] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: company?.name,
      category: company?.category,
      website: company?.website,
    },
  });

  const updatedImageUrl = watch("imageURL");

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (!company) {
        toast({
          title: "Error",
          description: "Company not found",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      const companyId = company.id;
      setIsLoading(true);
      updateCompanyWithId(companyId, data)
        .then(() => {
          refetchCompany();
          toast({
            status: "success",
            title: "Company Updated",
            description: "Your company has been updated.",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            status: "error",
            title: "Error",
            description: err,
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [company, toast, updateCompanyWithId, refetchCompany]
  );

  // Wall Plaque and Contract
  const setWallPlaqueUrl = useCallback(
    (url) => {
      if (company) {
        updateCompanyWithId(company.id, { wallPlaqueUrl: url });
        return;
      }
      toast({
        title: "Error",
        description: "Company not found",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    [company, toast, updateCompanyWithId]
  );

  const setContractUrl = useCallback(
    (url) => {
      if (company) {
        setContractUrlForId(company.id, url);
        return;
      }
      toast({
        title: "Error",
        description: "Company not found",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    [company, setContractUrlForId, toast]
  );

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Entity
                title={company?.name ?? "Company"}
                sublabel={company?.category}
                imageUrl={updatedImageUrl ?? company?.imageSource}
              />
              <UploadImage
                title="Logo"
                isPrefixPath={false}
                filePath={logoPath}
                setUrl={(url) => setValue("imageURL", url)}
              />
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel>Company Name</FormLabel>
                <Input
                  {...register("name", {
                    required: "A company name is required.",
                  })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input
                  type="url"
                  placeholder="https://"
                  {...register("website")}
                />
              </FormControl>
              <FormControl isInvalid={Boolean(errors.category)}>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category", {
                    required: "A category is required.",
                  })}
                >
                  {Database.companyCategoryArray.map(
                    (cat: Database.CompanyCategory) => {
                      return <option key={cat}>{cat}</option>;
                    }
                  )}
                </Select>
                <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
              </FormControl>
              <Button colorScheme="teal" type="submit" isLoading={isLoading}>
                Submit
              </Button>
              <Divider />
              <FormControl>
                <FormLabel>Wall Plaque</FormLabel>
                <Stack>
                  {company?.wallPlaqueUrl && (
                    <Link href={company.wallPlaqueUrl} w="fit-content">
                      <Tag w="fit-content">Your Wall Plaque</Tag>
                    </Link>
                  )}
                  <ButtonGroup w="full">
                    <Link href={wallPlaqueTemplateUrl} target="_blank">
                      <Button w="full">Download Template</Button>
                    </Link>
                    <FileUpload
                      filePath={wallPlaquePath}
                      isPrefixPath
                      acceptedFiles={{ "application/zip": [] }}
                      setUrl={(url) => setWallPlaqueUrl(url)}
                      setIsLoading={setIsUploadingWallPlaque}
                      w="full"
                    >
                      <Button
                        w="full"
                        colorScheme="teal"
                        isLoading={isUploadingWallPlaque}
                      >
                        Upload
                      </Button>
                    </FileUpload>
                  </ButtonGroup>
                </Stack>
                <FormHelperText>
                  Please upload the .potx file in a .zip archive
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Contract</FormLabel>
                <ButtonGroup w="full">
                  <Link href={contractTemplateUrl} target="_blank">
                    <Button w="full">Download Template</Button>
                  </Link>
                  <FileUpload
                    filePath={contractPath}
                    isPrefixPath
                    acceptedFiles={{ "application/pdf": [] }}
                    setUrl={(url) => setContractUrl(url)}
                    setIsLoading={setIsUploadingContract}
                    w="full"
                  >
                    <Button
                      w="full"
                      colorScheme="teal"
                      isLoading={isUploadingContract}
                    >
                      Upload
                    </Button>
                  </FileUpload>
                </ButtonGroup>
                <FormHelperText>
                  You can find your contract in the sidebar.
                </FormHelperText>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </form>
    </Modal>
  );
};

export default CompanyModal;
