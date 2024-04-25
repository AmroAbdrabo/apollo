import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MemberSignupForm } from "./MemberSignupForm";

const MemberSignup: React.FC = () => {
  const router = useRouter();

  const companyId = (router.query.companyId as string) ?? undefined;
  const inviteCode = (router.query.inviteCode as string) ?? undefined;

  return (
    <Box w="100vw" h="100vh" overflow="auto">
      <MemberSignupForm companyId={companyId} inviteCode={inviteCode} />
    </Box>
  );
};

export default MemberSignup;
