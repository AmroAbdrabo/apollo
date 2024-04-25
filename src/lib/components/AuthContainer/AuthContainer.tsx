import { Box } from "@chakra-ui/react";

const AuthContainer: React.FC = ({ children }) => {
  return (
    <Box maxW="600px" mx="auto" p={["20px", "50px"]}>
      {children}
    </Box>
  );
};

export default AuthContainer;
