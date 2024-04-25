import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// initialize firebase
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { db, auth, storage };
