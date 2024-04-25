import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  verifyPasswordResetCode,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { Auth, Database } from "../../../../shared/types";
import { auth } from "./firebase";

export const useFirebaseAuth = () => {
  // hook state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userGroup, setUserGroup] = useState<Database.UserGroupType | null>(
    null
  );
  const [userCompanyId, setUserCompanyId] = useState<string | null>(null);

  // state change listener
  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setUser(null);
      setUserGroup(null);
      setUserCompanyId(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setUser(authState);
    setIsLoading(false);
  };

  // sign in
  const signInAction = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out
  const signOutAction = () => {
    signOut(auth);
  };

  // create account
  const createAccount = useCallback((email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const forgotPassword = useCallback((email: string) => {
    return sendPasswordResetEmail(auth, email);
  }, []);

  const resetPassword = useCallback((oobCode: string, newPassword: string) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }, []);

  const getEmailFromCode = useCallback((oobCode: string) => {
    return verifyPasswordResetCode(auth, oobCode);
  }, []);

  // listen for firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function refreshClaims() {
      if (user) {
        // get claims from user object
        const tokenResult = await user.getIdTokenResult();
        const { companyId, group } =
          tokenResult?.claims as Auth.UserCustomClaims;

        // set state
        setUserGroup(group);
        setUserCompanyId(companyId);
      } else {
        // reset state
        setUserGroup(null);
        setUserCompanyId(null);
      }
    }
    refreshClaims();
  }, [user]);

  return {
    user,
    isLoading,
    userGroup,
    userCompanyId,
    signInAction,
    signOutAction,
    createAccount,
    forgotPassword,
    resetPassword,
    getEmailFromCode,
  };
};
