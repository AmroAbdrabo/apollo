import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import AuthContainer from "lib/components/AuthContainer/AuthContainer";
import { useFirebaseAuth } from "lib/modules/firebase/firebaseAuth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
}

export const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword } = useFirebaseAuth();
  const router = useRouter();
  const toast = useToast();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    setIsLoading(true);
    try {
      await forgotPassword(email)
        .then(() => {
          setEmailSent(true);
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Request failed.",
            description: err.message,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
        });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthContainer>
        <Heading>Request submitted</Heading>
        <Stack>
          <Text>
            An email has been sent to your account email address with a link to
            reset your password.
          </Text>
          <Flex justifyContent="flex-end">
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          </Flex>
        </Stack>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Heading size="lg">Forgot Password?</Heading>
          <Box fontSize="sm">
            <Text>Enter your account email and we will send you a link</Text>
            <Text>to reset your password.</Text>
          </Box>
          <FormControl isInvalid={Boolean(errors.email)}>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "An email is required.",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Flex justifyContent="flex-end">
            <Button type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </Flex>
        </Stack>
      </form>
    </AuthContainer>
  );
};
