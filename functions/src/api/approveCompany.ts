import { Request, Response } from "express";
import { API, Auth, Database, DatabaseModel } from "../../../shared/types";
import { auth, db } from "../firebase";
import { sendNewInvitationCode } from "./generateInvitationCode";

const approveCompany = async (req: Request, res: Response) => {
  try {
    // check authentication
    const decodedToken = await auth.verifyIdToken(
      String(req.headers.authorization)
    );

    // check user claims
    const claims = decodedToken as unknown as Auth.UserCustomClaims;
    const { group } = claims;

    if (group !== "admin") {
      res.status(403).send();
    }

    const { companyId } = req.body as API.ApproveCompany.Request;

    // approve application
    const updates: Partial<Database.CompanyType> = { status: "active" };
    await db.collection("companies").doc(companyId).update(updates);

    // get startup
    const companyRef = db
      .collection(DatabaseModel.Companies.key)
      .doc(companyId);
    const companyDoc = await companyRef.get();
    const company = companyDoc.data() as Database.CompanyType;

    // get application
    const applicationRef = db
      .collection(DatabaseModel.Companies.key)
      .doc(companyId)
      .collection(DatabaseModel.Companies.Private.key)
      .doc("application");

    const applicationDoc = await applicationRef.get();
    const application = applicationDoc.data() as Database.ApplicationType;

    // get founder
    const { founder } = application;
    const { email } = founder;
    const { type } = company;

    // generate and send invitation code
    await sendNewInvitationCode(type, companyId, email);

    res.status(200).send();
  } catch (error) {
    const typedError = error as Error;
    const message = { message: typedError?.message };

    console.error(message);

    res.status(500).send(message);
  }
};

export default approveCompany;
