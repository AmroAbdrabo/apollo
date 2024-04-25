import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../firebase/firebaseProvider";

// redirects the user to the redirectRoute if authentication state does not match expectedAuthState
const useGuard = (expectedAuthState: boolean, redirectRoute: string) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (user == null) === expectedAuthState)
      router.push(redirectRoute);
  }, [user, isLoading, router, redirectRoute, expectedAuthState]);

  return { isLoading };
};

export default useGuard;
