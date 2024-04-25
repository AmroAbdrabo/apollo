import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

import {
  AUTH_EMULATORS,
  FIRESTORE_EMULATORS,
  STORAGE_EMULATORS,
  FUNCTIONS_EMULATORS,
} from "utils/devmode";

const firebaseConfig = {
  apiKey: "AIzaSyCJAJA5wogghizsZSb8kdIfWu8xgEy0Qq8",
  authDomain: "rockethub-4e6bc.firebaseapp.com",
  databaseURL:
    "https://rockethub-4e6bc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rockethub-4e6bc",
  storageBucket: "rockethub-4e6bc.appspot.com",
  messagingSenderId: "585029398242",
  appId: "1:585029398242:web:907ef10aa9e7dbb01db8bb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
const functions = getFunctions(app);

if (FIRESTORE_EMULATORS) {
  connectFirestoreEmulator(firestore, "localhost", 4003);
}

if (AUTH_EMULATORS) {
  connectAuthEmulator(auth, "http://127.0.0.1:4001");
}

if (STORAGE_EMULATORS) {
  connectStorageEmulator(storage, "127.0.0.1", 4004);
}

if (FUNCTIONS_EMULATORS) {
  connectFunctionsEmulator(functions, "127.0.0.1", 4002);
}
