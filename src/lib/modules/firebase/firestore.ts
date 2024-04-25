import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Database } from "../../../../shared/types";
import { firestore } from "./firebase";
import { db } from "../../../../../myrockethub/functions/src/firebase";

const getApplicationsWithStatus = async () => {
  const queryRef = query(
    collection(firestore, "companies"),
    where("status", "in", ["applied", "rejected"])
  );
  const querySnapshot = await getDocs(queryRef);

  const applicationsWithStatus = [] as Database.ApplicationWithStatusType[];

  for (const d of querySnapshot.docs) {
    const applicationRef = doc(d.ref, "private", "application");
    const applicationSnapshot = await getDoc(applicationRef);
    const application = applicationSnapshot.data() as Database.ApplicationType;

    if (application) {
      applicationsWithStatus.push({
        ...application,
        id: d.id,
        status: d.data().status,
      } as Database.ApplicationWithStatusType);
    }
  }

  return applicationsWithStatus;
};

const getUsers = async () => {
  const collectionRef = collection(firestore, "users");

  const collectionSnapshot = await getDocs(collectionRef);

  const users = [] as Database.UserType[];

  collectionSnapshot.forEach((d) => {
    users.push({ id: d.id, ...d.data() } as Database.UserType);
  });

  return users;
};

const getCompanies = async () => {
  // query collection
  const collectionRef = collection(firestore, "companies");
  const collectionSnapshot = await getDocs(collectionRef);

  const companies = [] as Database.CompanyType[];

  collectionSnapshot.forEach((d) => {
    companies.push({ id: d.id, ...d.data() } as Database.CompanyType);
  });

  return companies;
};

const getCompanyById = async (startupId: string | undefined) => {
  // query document

  if (!startupId) {
    return null;
  }

  const docRef = doc(collection(firestore, "companies"), startupId);
  const docSnap = await getDoc(docRef);

  // return data
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Database.CompanyType;
  }

  return null;
};

// does not work on production code
const rejectApplicationWithId = async (applicationId: string) => {
  // Whenever an application gets rejected, we add the 'isRejected' flag
  //const ref = doc(firestore, `companies/${applicationId}`);
  
  //await updateDoc(ref, {
   // status: "rejected",
  //});
  console.log(`application id is ${applicationId}`)
  await db.collection("companies").doc(applicationId).update( {
    status: "rejected",
  });
  console.log(`thjis went throught`)
};

export {
  getApplicationsWithStatus,
  getCompanies,
  getCompanyById,
  getUsers,
  rejectApplicationWithId,
};
