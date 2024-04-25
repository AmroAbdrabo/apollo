import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Entity from "lib/components/Entity/Entity";
import { useCompanyById } from "lib/hooks/useCompanyById";
import useAPI from "lib/hooks/useAPI";
import { useFirebaseAuth } from "lib/modules/firebase/firebaseAuth";
import useGuard from "lib/modules/routing/useGuard";
import { addLinkedinLinkToHandle } from "lib/modules/utils/shared";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loading } from "../Loading/Loading";

// TODO @jonas <CompanyInfo /> takes state form redux, populate redux here instead of state, same for UserInfo

const MIN_PASSWORD_LENGTH = 12;

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  linkedin: string;
  password: string;
}

interface Props {
  inviteCode: string | undefined;
  companyId: string | undefined;
}

export const MemberSignupForm: React.FC<Props> = ({
  inviteCode,
  companyId,
}) => {
  const { isLoading: isLoadingAuth } = useGuard(false, "/dashboard");

  // * Status Indicators
  const [isLoading, setIsLoading] = useState(false);

  // * Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // * Firebase
  const { createAccount } = useAPI();
  const { signInAction } = useFirebaseAuth();

  // * Toast
  const toast = useToast();

  const { company } = useCompanyById(companyId);

  // * React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
    firstName,
    lastName,
    position,
    linkedin,
  }) => {
    if (!company) {
      toast({
        title: "Error",
        description: "Company not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!inviteCode) {
      toast({
        title: "Error",
        description: "Invite code not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      setIsLoading(true);
      await createAccount(
        email,
        password,
        firstName,
        lastName,
        position,
        inviteCode,
        addLinkedinLinkToHandle(linkedin)
      );
      await signInAction(email, password);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "There has been an error creating your account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingAuth) return <Loading />;

  if (!company)
    return (
      <VStack>
        <Heading size="md">No company</Heading>
        <Text>Try to redeem your code again.</Text>
        <Link href="/redeem" passHref>
          <Button>Redeem again</Button>
        </Link>
      </VStack>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        overflow="auto"
        margin="25px auto"
        padding="20px"
        maxW="1000px"
        w="500px"
      >
        <Heading size="sm">RocketHub.</Heading>
        <Heading fontSize="lg">Member Signup</Heading>
        <HStack>
          <Text>Invite Code:</Text>
          <Tag>{inviteCode || "NO CODE"}</Tag>
        </HStack>
        {company && (
          <Entity
            title={company.name}
            imageUrl={company.imageSource}
            sublabel={company.category}
          />
        )}
        <FormControl isRequired isInvalid={Boolean(errors.email)}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email", { required: "An email is required." })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "A password is required.",
                minLength: {
                  value: MIN_PASSWORD_LENGTH,
                  message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button size="sm" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.firstName)}>
          <FormLabel>First Name</FormLabel>
          <Input
            {...register("firstName", {
              required: "A first name is required.",
            })}
          />
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.lastName)}>
          <FormLabel>Last Name</FormLabel>
          <Input
            {...register("lastName", { required: "A last name is required." })}
          />
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.position)}>
          <FormLabel>Position</FormLabel>
          <Input
            {...register("position", { required: "A position is required." })}
          />
          <FormHelperText>CEO, CTO, CFO, ...</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>
            LinkedIn <Tag colorScheme="teal">Recommended</Tag>
          </FormLabel>
          <InputGroup>
            <InputLeftAddon>linkedin.com/in/</InputLeftAddon>
            <Input {...register("linkedin")} />
          </InputGroup>
        </FormControl>
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
