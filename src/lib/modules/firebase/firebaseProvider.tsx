/* eslint-disable @typescript-eslint/no-empty-function */
import { User, UserCredential } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { generalActions } from "redux/slices/generalSlice";
import { Database, DatabaseModel } from "../../../../shared/types";
import { firestore } from "./firebase";
import { useFirebaseAuth } from "./firebaseAuth";
import { useFirestore } from "./firebaseFirestore";
// auth context
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  userGroup: Database.UserGroupType | null;
  userCompanyId: string | null;
  signInAction(email: string, password: string): Promise<UserCredential | null>;
  signOutAction(): void;
};

const authContextDefault: AuthContextType = {
  user: null,
  isLoading: true,
  userGroup: null,
  userCompanyId: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signInAction: async (email: string, password: string) => null,
  signOutAction: () => {},
};

const authContext = createContext(authContextDefault);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useFirebaseAuth();
  const { getContractById } = useFirestore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // * Users Snapshot Listener
    if (auth) {
      const userCollectionRef = collection(firestore, DatabaseModel.Users.key);
      const unsubscribeUsers = onSnapshot(userCollectionRef, (snapshot) => {
        const users: Database.UserType[] = [];
        snapshot.forEach((doc) => {
          const u = doc.data() as Database.UserType;
          u.id = doc.id;
          users.push(u);
        });
        dispatch(generalActions.setUsers(users));
      });

      // * Supporters Snapshot Listener
      const supporterCollectionRef = collection(
        firestore,
        DatabaseModel.SupportersProgramme.key
      );
      const unsubscribeSupporters = onSnapshot(
        supporterCollectionRef,
        (snapshot) => {
          const supporters: Database.SupporterType[] = [];
          snapshot.forEach((doc) => {
            const supporter = doc.data() as Database.SupporterType;
            supporter.id = doc.id;
            supporters.push(supporter);
          });
          dispatch(generalActions.setSupporters(supporters));
        }
      );

      // * Events Snapshot Listener
      const eventCollectionRef = collection(
        firestore,
        DatabaseModel.Events.key
      );
      const unsubscribeEvents = onSnapshot(eventCollectionRef, (snapshot) => {
        const events: Database.EventType[] = [];
        snapshot.forEach((doc) => {
          const event = doc.data() as Database.EventType;
          event.id = doc.id;
          events.push(event);
        });
        dispatch(generalActions.setEvents(events));
      });

      // * Mentors Snapshot Listener
      const mentorCollectionRef = collection(
        firestore,
        DatabaseModel.Mentors.key
      );
      const unsubscribeMentors = onSnapshot(mentorCollectionRef, (snapshot) => {
        const mentors: Database.MentorType[] = [];
        snapshot.forEach((doc) => {
          const mentor = doc.data() as Database.MentorType;
          mentor.id = doc.id;
          mentors.push(mentor);
        });
        dispatch(generalActions.setMentors(mentors));
      });

      // * Get Contract
      if (auth.userCompanyId) {
        getContractById(auth.userCompanyId)
          .then((contract) => {
            if (contract?.url) {
              dispatch(generalActions.setContractURL(contract.url));
            }
          })
          .catch((err) => console.error(err));
      }

      return () => {
        unsubscribeUsers();
        unsubscribeSupporters();
        unsubscribeEvents();
        unsubscribeMentors();
      };
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, auth]);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// auth hook
export const useAuth = () => useContext(authContext);
