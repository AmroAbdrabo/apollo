import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import AuthContainer from "lib/components/AuthContainer/AuthContainer";
import { useFirebaseAuth } from "lib/modules/firebase/firebaseAuth";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loading } from "../Loading/Loading";
import useResetCode from "./hooks/useResetCode";

const MIN_PASSWORD_LENGTH = 6;
interface Inputs {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
  // react hook form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // router
  const router = useRouter();
  const { oobCode } = router.query;
  const code = useMemo(() => {
    if (typeof oobCode === "string") return oobCode;
    return "";
  }, [oobCode]);

  // toast
  const toast = useToast();

  // auth
  const { resetPassword } = useFirebaseAuth();

  // password visibility
  const [showPassword, setShowPassword] = useState(false);

  // loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // flow control
  const [resetSuccessful, setResetSuccessful] = useState(false);

  // get information from reset code
  const { isLoading, isError, email } = useResetCode(code);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) return;

      setIsSubmitting(true);
      await resetPassword(code, newPassword)
        .then(() => {
          setResetSuccessful(true);
        })
        .catch((err) => {
          console.log(err.message);
          toast({
            title: "Request failed.",
            description: err.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [code, resetPassword, toast]
  );

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <AuthContainer>
        <Heading>Something went wrong...</Heading>
        <Stack>
          <Text>
            Please make sure that the confirmation link sent by email is not
            reused or edited.
          </Text>
          <Button
            onClick={() => {
              router.push("/forgotpassword");
            }}
          >
            New Request
          </Button>
        </Stack>
      </AuthContainer>
    );
  }

  if (resetSuccessful) {
    return (
      <AuthContainer>
        <Heading>Success!</Heading>
        <Stack spacing={2}>
          <Text>You can now log in with your new password.</Text>
          <Button
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        </Stack>
      </AuthContainer>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthContainer>
        <Heading size="lg">Password Reset</Heading>
        <Stack>
          <FormControl>
            <FormLabel>Please enter a new password</FormLabel>
            {email && <Input readOnly value={email} />}
          </FormControl>
          <FormControl isInvalid={Boolean(errors.newPassword)}>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                {...register("newPassword", {
                  required: "A password is required.",
                  minLength: {
                    value: MIN_PASSWORD_LENGTH,
                    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.newPassword && errors.newPassword.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.confirmPassword)}>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                {...register("confirmPassword", {
                  required: "A password is required.",
                  minLength: {
                    value: MIN_PASSWORD_LENGTH,
                    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
                  },
                  validate: (match: string) => {
                    if (watch("newPassword") !== match) {
                      return "Passwords do not match.";
                    }
                    return true;
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Flex justifyContent="flex-end">
            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </Flex>
        </Stack>
      </AuthContainer>
    </form>
  );
};
