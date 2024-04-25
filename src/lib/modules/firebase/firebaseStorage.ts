import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback } from "react";
import { storage } from "./firebase";

export const useStorage = () => {
  // upload file
  const uploadFile = useCallback(
    async (filePath: string, file: File): Promise<boolean> => {
      try {
        await uploadBytes(ref(storage, filePath), file);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    []
  );

  // get url
  const getURL = useCallback(async (filePath: string): Promise<string> => {
    return await getDownloadURL(ref(storage, filePath));
  }, []);

  return { uploadFile, getURL };
};
