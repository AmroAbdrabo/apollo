import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import AuthContainer from "lib/components/AuthContainer/AuthContainer";
import { useFirebaseAuth } from "lib/modules/firebase/firebaseAuth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

const MIN_PASSWORD_LENGTH = 6;
interface Inputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signInAction } = useFirebaseAuth();

  // * React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const loginResult = await signInAction(email, password);
      if (loginResult) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setLoginFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const { isOpen, onToggle } = useDisclosure();

  const showPassword = () => {
    onToggle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthContainer>
        <Stack>
          <Heading size="lg">Login</Heading>
          <Stack spacing={3}>
            <Stack>
              <FormControl isInvalid={Boolean(errors.email) || loginFailed}>
                <Input
                  variant="filled"
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
              <FormControl isInvalid={Boolean(errors.password) || loginFailed}>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="link"
                      aria-label={isOpen ? "Hide password" : "Show password"}
                      icon={isOpen ? <HiEye /> : <HiEyeOff />}
                      onClick={showPassword}
                    />
                  </InputRightElement>
                  <Input
                    variant="filled"
                    type={isOpen ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "A password is required.",
                      minLength: {
                        value: MIN_PASSWORD_LENGTH,
                        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
                <FormErrorMessage>
                  {loginFailed && "Unknown email and password combination."}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" isLoading={isLoading}>
                Login
              </Button>
            </Stack>
            <Flex justifyContent="flex-end">
              <Button
                variant="link"
                size="sm"
                colorScheme="blue"
                onClick={() => router.push("/forgotpassword")}
              >
                Forgot Password?
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </AuthContainer>
    </form>
  );
};

export default Login;
