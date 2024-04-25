import { Request, Response } from "express";
import { API, Database, DatabaseModel } from "../../../shared/types";
import { db } from "../firebase";
import sendMail from "../mail/mail";

const createCompany = async (req: Request, res: Response) => {
  try {
    // get application data
    const { application } = req.body as API.CreateCompany.Request;

    // create company object (initially setting the status to applied so it shows up in the applications tab)
    const company: Omit<Database.CompanyType, "id"> = {
      name: application.startup.name,
      category: application.startup.category as Database.CompanyCategory,
      missionStatement: application.startup.description,
      imageSource: "",
      status: "applied",
      type: "startup",
    };

    // add object to database
    const companyRef = await db
      .collection(DatabaseModel.Companies.key)
      .add(company);

    await companyRef
      .collection(DatabaseModel.Companies.Private.key)
      .doc("application")
      .set(application);

    // send email to founder
    const { founder } = application;
    const { email } = founder;

    // send submitted email
    sendMail(
      '"RocketHub" <rockethub-bot@entrepreneur-club.org>',
      email,
      "RocketHub Application Submitted",
      `Dear user, \n\nyour application to the RocketHub was successfully submitted.`
    );

    res.status(200).send("{}");
  } catch (error) {
    const typedError = error as Error;
    const message = { message: typedError?.message };

    console.error(message);

    res.status(500).send(message);
  }
};

export default createCompany;
