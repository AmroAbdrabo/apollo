import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import useAPI from "lib/hooks/useAPI";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import useGuard from "lib/modules/routing/useGuard";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loading } from "../Loading/Loading";

interface Inputs {
  code: string;
}

const RedeemInvite: React.FC = () => {
  const router = useRouter();

  const { isLoading: isLoadingAuth } = useGuard(false, "/dashboard");

  const { verifyInvitationCode } = useAPI();
  const [isLoading, setIsLoading] = useState(false);

  const { getStartupById } = useFirestore();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ code }) => {
    setIsLoading(true);
    verifyInvitationCode(code)
      .then((result) => {
        console.log(result);
        if (result.isValid && result.companyId) {
          getStartupById(result.companyId)
            .then((company) => {
              if (company) {
                router.push({
                  pathname: "/membersignup",
                  query: { inviteCode: code, companyId: result.companyId },
                });
              } else {
                toast({
                  title: "Error",
                  description: "Company not found",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            })
            .catch((err) => {
              console.error(err);
              toast({
                title: "Error",
                description: err,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            });
        } else {
          toast({
            title: "Invalid Code",
            description: "The code you entered is invalid.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoadingAuth) {
    return <Loading />;
  }

  return (
    <Center w="100vw" h="100vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl isInvalid={Boolean(errors.code)}>
            <FormLabel>Redeem Invite</FormLabel>
            <Input
              placeholder="Code"
              {...register("code", { required: "A code is required." })}
            />
            <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </Stack>
      </form>
    </Center>
  );
};

export default RedeemInvite;
