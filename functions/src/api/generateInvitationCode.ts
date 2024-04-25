import { Request, Response } from "express";
import { API, Auth, Database, DatabaseModel } from "../../../shared/types";
import { db, auth } from "../firebase";
import crypto from "crypto";
import sendMail from "../mail/mail";

export const sendNewInvitationCode = async (
  group: Database.UserGroupType,
  companyId: string,
  email: string
): Promise<void> => {
  // generate invitation code
  const invitationCodeBytes = crypto.randomBytes(4);
  const invitationCodeString = invitationCodeBytes.toString("hex");

  // build invitation code
  const invitationCodeRecord: Database.InvitationCodeType = {
    group,
    companyId,
    used: false,
  };

  // save code to database
  const invitationCodeRef = db
    .collection(DatabaseModel.InvitationCodes.key)
    .doc(invitationCodeString);

  await invitationCodeRef.set(invitationCodeRecord);

  // send code to email
  await sendMail(
    '"RocketHub" <rockethub-bot@entrepreneur-club.org>',
    email,
    "You've been invited to a RocketHub startup!",
    `Dear member of a RocketHub startup,\n\nYou have been invited to join your startup on MyRocketHub!\nMyRocketHub is the central platform of the RocketHub and it is essential that you join it.\n\nTo join your team on MyRocketHub, please redeem your invite on https://www.rocket-hub.ch/redeem using the following code:\n${invitationCodeString} \n\nSee you there!`
  );
};

export const generateInvitationCode = async (req: Request, res: Response) => {
  try {
    // check authentication
    const decodedToken = await auth.verifyIdToken(
      String(req.headers.authorization)
    );

    // check user claims
    const claims = decodedToken as unknown as Auth.UserCustomClaims;
    const { companyId, group } = claims;

    // parse request body for given group
    const { email } = req.body as API.GenerateInvitationCode.Request;

    if (!companyId) {
      throw new Error("user is not associated with a company");
    }

    // generate and send invitation code
    await sendNewInvitationCode(group, companyId, email);

    // return code in response
  } catch (error) {
    const typedError = error as Error;
    console.error(typedError?.message);

    res.status(500).send(typedError?.message);
  }
  res.status(200).send("");
};
