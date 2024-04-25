import { Request, Response } from "express";
import { API, Database } from "../../../shared/types";
import { db } from "../firebase";

const verifyInvitationCode = async (req: Request, res: Response) => {
  try {
    // get invitation code from request
    if (
      !("invitationCode" in req.body) ||
      typeof req.body.invitationCode !== "string" ||
      !req.body.invitationCode
    ) {
      throw new Error("invitationCode missing from request body");
    }

    // get invitation code from request
    const { invitationCode } = req.body as API.VerifyInvitationCode.Request;

    // get invitation code from database
    const invitationCodeRecord = await db
      .collection("invitationCodes")
      .doc(invitationCode)
      .get();

    // * use custom error type
    if (!invitationCodeRecord.exists) {
      throw new Error("invitation code does not exist");
    }

    // read properties from data
    const invitationCodeData =
      invitationCodeRecord.data() as Database.InvitationCodeType;

    const { used, companyId } = invitationCodeData;

    // check if invitation code was used
    if (used) {
      throw new Error("invitation code has already been used");
    }

    // create return object
    const responseData: API.VerifyInvitationCode.Response = {
      isValid: true,
      companyId,
    } as API.VerifyInvitationCode.Response;

    // send response
    res.status(200).send(responseData);
  } catch (error) {
    const typedError = error as Error;
    const message = { message: typedError?.message };

    res.status(500).send(message);
  }
};

export default verifyInvitationCode;
