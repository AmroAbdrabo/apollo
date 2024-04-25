import { useFirebaseAuth } from "lib/modules/firebase/firebaseAuth";
import { useEffect, useState } from "react";

function useResetCode(code: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");

  const { getEmailFromCode } = useFirebaseAuth();

  useEffect(() => {
    if (!code) return;
    const getEmail = async () => {
      await getEmailFromCode(code)
        .then((mail) => {
          setIsError(false);
          setEmail(mail);
        })
        .catch((err) => {
          console.error(err);
          setEmail("");
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getEmail();
  }, [code, getEmailFromCode]);

  return { isLoading, isError, email };
}

export default useResetCode;
