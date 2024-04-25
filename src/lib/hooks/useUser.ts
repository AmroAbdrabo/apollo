import { useQuery } from "@tanstack/react-query";
import { useFirebaseAuth } from "lib/modules/firebase/firebaseAuth";
import { getUsers } from "lib/modules/firebase/firestore";

export const useUser = () => {
  const { data, isLoading, refetch } = useQuery(["users"], getUsers);

  const auth = useFirebaseAuth();

  //TODO @dennis: Put this in getUsers and not here!!!
  const currentUser = data?.find((u) => u.id === auth.user?.uid);
  if (!currentUser) {
    return { user: null, isLoadingUser: isLoading };
  }

  return {
    user: currentUser,
    isLoadingUser: isLoading,
    refetchUser: refetch,
  };
};
