import { useCallback } from "react";
import { API, Database } from "../../../shared/types";
import { useAuth } from "../modules/firebase/firebaseProvider";

const FUNCTIONS_API_ENDPOINT ="https://us-central1-rockethub-4e6bc.cloudfunctions.net/rockethub/api/v1";//"http://127.0.0.1:4002/rockethub-4e6bc/us-central1/rockethub/api/v1";
  //"https://us-central1-rockethub-4e6bc.cloudfunctions.net/rockethub/api/v1";
  

//"http://127.0.0.1:4002/rockethub-4e6bc/us-central1/rockethub/api/v1";

// redirects the user to the redirectRoute if authentication state does not match expectedAuthState
const useAPI = () => {
  const { user } = useAuth();

  const generateInvitationCode = useCallback(
    async (email: string) => {
      try {
        // get id token
        const token = await user?.getIdToken(true);

        if (!token) return;

        // create request body
        const requestBody: API.GenerateInvitationCode.Request = {
          email,
        };

        const body = JSON.stringify(requestBody);

        // create request headers
        const headers = {
          "Content-Type": "application/json",
          Authorization: token,
        };

        // send request
        const url = `${FUNCTIONS_API_ENDPOINT}/generateInvitationCode`;

        // fetch url
        await fetch(url, {
          method: "POST",
          headers,
          body,
        });
      } catch (error) {
        const typedError = error as Error;
        console.log("encountered error", typedError?.message);
      }
    },
    [user]
  );

  const approveCompany = async (companyId: string) => {
    try {
      // get id token
      const token = await user?.getIdToken(true);

      if (!token) return;

      // create request body
      const requestBody: API.ApproveCompany.Request = {
        companyId,
      };

      const body = JSON.stringify(requestBody);

      // create request headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      // send request
      const url = `${FUNCTIONS_API_ENDPOINT}/approveCompany`;

      // fetch url
      await fetch(url, {
        method: "POST",
        headers,
        body,
      });
    } catch (error) {
      const typedError = error as Error;
      console.log("encountered error", typedError?.message);
    }
  };

  const createCompany = async (application: Database.ApplicationType) => {
    try {
      // create request body
      const requestBody: API.CreateCompany.Request = {
        application,
      };

      const body = JSON.stringify(requestBody);

      // create request headers
      const headers = {
        "Content-Type": "application/json",
      };

      // send request
      const url = `${FUNCTIONS_API_ENDPOINT}/createCompany`;

      // fetch url
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      // check response
      return response.json();
    } catch (error) {
      const typedError = error as Error;
      console.log("encountered error", typedError?.message);
      return null;
    }
  };

  const verifyInvitationCode = async (
    invitationCode: string
  ): Promise<{ isValid: boolean; companyId: string | null }> => {
    try {
      // create request body
      const requestBody = {
        invitationCode,
      };

      const body = JSON.stringify(requestBody);

      // create request headers
      const headers = {
        "Content-Type": "application/json",
      };

      // send request
      const url = `${FUNCTIONS_API_ENDPOINT}/verifyInvitationCode`;

      // fetch url
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      // check response
      const res = await response.json();

      if (!("isValid" in res)) {
        return { isValid: false, companyId: null };
      }

      return res;
    } catch (error) {
      return { isValid: false, companyId: null };
    }
  };

  const createAccount = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      position: string,
      invitationCode: string,
      linkedIn?: string
    ) => {
      try {
        // create request body
        const linkedInURL = linkedIn ?? "";

        const requestBody: API.CreateAccount.Request = {
          invitationCode,
          email,
          password,
          firstName,
          lastName,
          position,
          linkedInURL,
        };

        const body = JSON.stringify(requestBody);

        // create request headers
        const headers = {
          "Content-Type": "application/json",
        };

        // send request
        const url = `${FUNCTIONS_API_ENDPOINT}/createAccount`;

        // fetch url
        const response = await fetch(url, {
          method: "POST",
          headers,
          body,
        });

        return response.json();
      } catch (error) {
        return { isValid: false, startupId: null };
      }
    },
    []
  );

  const disableUsers = useCallback(
    async (userIds: string[]) => {
      try {
        // get id token
        const token = await user?.getIdToken(true);

        if (!token) return;

        const requestBody: API.DisableUsers.Request = {
          userIds,
        };

        const body = JSON.stringify(requestBody);

        // create request headers
        const headers = {
          "Content-Type": "application/json",
          Authorization: token,
        };

        // send request
        const url = `${FUNCTIONS_API_ENDPOINT}/disableUsers`;

        // fetch url
        await fetch(url, {
          method: "POST",
          headers,
          body,
        });
      } catch (error) {
        const typedError = error as Error;
        console.log("encountered error", typedError?.message);
      }
    },
    [user]
  );

  const contactMentor = useCallback(
    async (requestBody: API.ContactMentor.Request) => {
      try {
        const body = JSON.stringify(requestBody);

        // create request headers
        const headers = {
          "Content-Type": "application/json",
        };

        // send request
        const url = `${FUNCTIONS_API_ENDPOINT}/contactMentor`;

        // fetch url
        await fetch(url, {
          method: "POST",
          headers,
          body,
        });
      } catch (error) {
        const typedError = error as Error;
        console.log("encountered error", typedError?.message);
      }
    },
    []
  );

  return {
    verifyInvitationCode,
    createAccount,
    createCompany,
    generateInvitationCode,
    approveCompany,
    disableUsers,
    contactMentor,
  };
};

export default useAPI;
