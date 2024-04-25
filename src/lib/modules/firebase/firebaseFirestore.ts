import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCallback } from "react";
import { Database } from "../../../../shared/types";
import { firestore } from "./firebase";

const useFirestore = () => {
  const getUser = async (uid: string): Promise<Database.UserType | null> => {
    // query document
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    // return data
    if (docSnap.exists()) {
      return docSnap.data() as Database.UserType;
    }

    return null;
  };

  const updateUser = useCallback(
    (uid: string, data: Partial<Database.UserType>) => {
      // clean input
      const cleanData = JSON.parse(JSON.stringify(data));
      // query document
      const docRef = doc(firestore, "users", uid);
      // update document
      return updateDoc(docRef, cleanData);
    },
    []
  );

  const updateSupporter = async (
    supporterId: string,
    updatedSupporter: Partial<Database.SupporterType>
  ) => {
    // query document
    const documentRef = doc(firestore, `supportersprogram/${supporterId}`);
    // update document
    return updateDoc(documentRef, updatedSupporter);
  };

  const addSupporter = async (
    supporterId: string,
    supporter: Partial<Database.SupporterType>
  ) => {
    return setDoc(
      doc(firestore, `supportersprogram/${supporterId}`),
      supporter
    );
  };

  const updateMentor = async (
    mentorId: string,
    updatedMentor: Partial<Database.MentorType>
  ) => {
    // query document
    const documentRef = doc(firestore, `mentors/${mentorId}`);
    // update document
    return updateDoc(documentRef, updatedMentor);
  };

  const addMentor = async (
    mentorId: string,
    mentor: Partial<Database.MentorType>
  ) => {
    console.log(mentorId, mentor);
    return setDoc(doc(firestore, `mentors/${mentorId}`), mentor);
  };

  const deleteMentorWithId = async (mentorId: string) => {
    deleteDoc(doc(firestore, `mentors/${mentorId}`));
  };

  const getUpdates = async (): Promise<Database.BackendUpdateType[]> => {
    // query collection
    const collectionGroupRef = collectionGroup(firestore, "updates");
    const collectionGroupSnapshot = await getDocs(collectionGroupRef);

    const updates: Database.BackendUpdateType[] = [];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    collectionGroupSnapshot.forEach((doc) => {
      const { id } = doc;
      updates.push({ id, ...doc.data() } as Database.BackendUpdateType);
    });
    return updates;
  };

  const getSupporters = async (): Promise<Database.SupporterType[]> => {
    // query collection
    const collectionRef = collection(firestore, "supportersprogram");
    const collectionSnapshot = await getDocs(collectionRef);

    const supporters: Database.SupporterType[] = [];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    collectionSnapshot.forEach((doc) => {
      const { id } = doc;
      supporters.push({ id, ...doc.data() } as Database.SupporterType);
    });

    return supporters;
  };

  const getMentors = async (): Promise<Database.MentorType[]> => {
    // query collection
    const collectionRef = collection(firestore, "mentors");
    const collectionSnapshot = await getDocs(collectionRef);

    const mentors: Database.MentorType[] = [];

    collectionSnapshot.forEach((d) => {
      const { id } = d;
      mentors.push({ id, ...d.data() } as Database.MentorType);
    });

    return mentors;
  };

  const updateCompanyWithId = useCallback(
    (companyId: string, data: Partial<Database.CompanyType>) => {
      // clean object
      const cleanData = JSON.parse(JSON.stringify(data));

      // company doc
      const companyDoc = doc(firestore, "companies", companyId);

      // update doc
      return updateDoc(companyDoc, cleanData);
    },
    []
  );

  const getStartupById = async (
    startupId: string
  ): Promise<Database.CompanyType | null> => {
    // query document
    const docRef = doc(collection(firestore, "companies"), startupId);
    const docSnap = await getDoc(docRef);

    // return data
    if (docSnap.exists()) {
      return docSnap.data() as Database.CompanyType;
    }

    return null;
  };

  const getSupporterById = async (
    supporterId: string
  ): Promise<Database.SupporterType | null> => {
    // query document
    const docRef = doc(collection(firestore, "supportersprogram"), supporterId);
    const docSnap = await getDoc(docRef);

    // return data
    if (docSnap.exists()) {
      return { id: supporterId, ...docSnap.data() } as Database.SupporterType;
    }

    return null;
  };

  const getUpdateFromCompany = async (
    companyId: string
  ): Promise<Database.UpdateType[]> => {
    // query supporters
    const collectionRef = collection(
      doc(collection(firestore, "startups"), companyId),
      "updates"
    );
    const collectionSnapshot = await getDocs(collectionRef);

    const updates = [] as Database.UpdateType[];

    collectionSnapshot.forEach((d) => {
      updates.push(d.data() as Database.UpdateType);
    });

    return updates;
  };

  const deleteSupporterWithId = async (supporterId: string) => {
    deleteDoc(doc(firestore, `supportersprogram/${supporterId}`));
  };

  const getEvents = async (): Promise<Database.EventType[]> => {
    // query collection
    const collectionRef = collection(firestore, "events");
    const collectionSnapshot = await getDocs(collectionRef);

    const events = [] as Database.EventType[];

    collectionSnapshot.forEach((d) => {
      events.push({ id: d.id, ...d.data() } as Database.EventType);
    });

    return events;
  };

  const addEvent = async (
    event: Omit<Database.EventType, "id">
  ): Promise<void> => {
    // query collection
    const collectionRef = collection(firestore, "events");

    // add document to collectionRef
    await addDoc(collectionRef, event);
  };

  const deleteEventWithId = async (eventId: string): Promise<void> => {
    deleteDoc(doc(firestore, `events/${eventId}`));
  };

  const getApplicationById = async (
    applicationId: string
  ): Promise<Database.ApplicationType | null> => {
    // query collection
    const docRef = doc(
      doc(collection(firestore, "companies"), applicationId),
      "private",
      "applications"
    );
    const docSnap = await getDoc(docRef);

    // return data
    if (docSnap.exists()) {
      return docSnap.data().application as Database.ApplicationType;
    }

    return null;
  };

  const getContractById = useCallback(
    async (companyId: string): Promise<Database.ContractType | null> => {
      // query collection
      const docRef = doc(
        doc(collection(firestore, "companies"), companyId),
        "private",
        "contract"
      );
      const docSnap = await getDoc(docRef);

      // return data
      if (docSnap.exists()) {
        return docSnap.data() as Database.ContractType;
      }

      return null;
    },
    []
  );

  const setContractUrlForId = useCallback(
    async (companyId: string, url: string) => {
      const docRef = doc(
        doc(collection(firestore, "companies"), companyId),
        "private",
        "contract"
      );
      return setDoc(docRef, { url });
    },
    []
  );

  const getUsers = () => {
    const collectionRef = collection(firestore, "users");
    return onSnapshot(collectionRef, (snapshot) => {
      const users: Database.UserType[] = [];
      snapshot.forEach((userDoc) => {
        users.push(userDoc.data() as Database.UserType);
      });
      return users;
    });
  };

  return {
    getUser,
    updateUser,
    getUsers,
    getSupporters,
    getMentors,
    getSupporterById,
    deleteSupporterWithId,
    deleteMentorWithId,
    getUpdates,
    getUpdateFromCompany,
    getStartupById,
    updateCompanyWithId,
    getEvents,
    addEvent,
    deleteEventWithId,
    addSupporter,
    updateSupporter,
    addMentor,
    updateMentor,
    getApplicationById,
    getContractById,
    setContractUrlForId,
  };
};

export const getMeetingRooms = async (): Promise<
  Database.MeetingRoomType[]
> => {
  // query supporters
  const collectionRef = collection(firestore, "rooms");
  const collectionSnapshot = await getDocs(collectionRef);

  const rooms = [] as Database.MeetingRoomType[];

  collectionSnapshot.forEach((d) => {
    rooms.push({ ...d.data(), id: d.id } as Database.MeetingRoomType);
  });

  return rooms;
};

export { useFirestore };
