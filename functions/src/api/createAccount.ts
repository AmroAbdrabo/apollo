import { Request, Response } from "express";
import * as firebase from "firebase-admin";
import { API, Auth, Database } from "../../../shared/types";
import { auth, db } from "../firebase";

const createAccount = async (req: Request, res: Response) => {
  try {
    const {
      invitationCode,
      email,
      password,
      firstName,
      lastName,
      position,
      linkedInURL,
    } = req.body as API.CreateAccount.Request;

    const invitationCodeRecord = await db
      .collection("invitationCodes")
      .doc(invitationCode)
      .get();

    if (!invitationCodeRecord.exists) {
      throw new Error("invitation code does not exist");
    }

    // read properties from data
    const invitationCodeData =
      invitationCodeRecord.data() as Database.InvitationCodeType;

    const { used, group, companyId } = invitationCodeData;

    // check if invitation code was used
    if (used) {
      throw new Error("invitation code has already been used");
    }

    // create user
    const displayName = `${firstName} ${lastName}`;

    const userData: firebase.auth.CreateRequest = {
      emailVerified: true,
      email,
      password,
      displayName,
    };

    const user = await auth.createUser(userData);

    // create custom claims
    const claims: Auth.UserCustomClaims = {
      group,
      companyId,
    };

    // set custom claims
    await auth.setCustomUserClaims(user.uid, claims);

    // create user database object
    const userRecord: Database.UserType = {
      id: user.uid,
      companyId,
      position,
      firstName,
      lastName,
      userGroup: group,
      linkedInURL,
    };

    await db.collection("users").doc(user.uid).set(userRecord);

    // set invitation code to used
    const updates = { used: true };
    await db.collection("invitationCodes").doc(invitationCode).update(updates);

    // generate return object
    const responseData: API.CreateAccount.Response = {
      group,
      companyId,
    };

    // send response
    res.status(200).send(responseData);
  } catch (error) {
    // * check for error types
    const typedError = error as Error;
    const message = { message: typedError?.message };

    console.error(message);

    res.status(500).send(message);
  }
};

export default createAccount;
