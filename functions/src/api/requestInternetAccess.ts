import { Request, Response } from "express";
import { API } from "../../../shared/types";
import sendMail from "../mail/mail";

const requestInternetAccess = async (req: Request, res: Response) => {
  // get data from request
  try {
    const {
      companyName,
      firstName,
      lastName,
      email,
      fullAddress,
      dateOfBirth,
    } = req.body as API.RequestInternetAccess.Request;

    // format body
    const body = `Please create a guest account with the following details:
    Startup: ${companyName} 
    First Name: ${firstName} 
    Last Name: ${lastName} 
    Email: ${email} 
    Full Address: ${fullAddress} 
    Date of Birth: ${dateOfBirth} (YYYY-MM-DD)

    Reason for requesting access:
    I am part of the RocketHub (Coworking Space from ETH Entrepreneur Club) and want to gain access to the internet there.
    Host: Club ETH Entrepreneur Club (entr-club) 
    Host-Organisation: 04800, VSETH (Verband Vorstand Deleg.) 
    Guest technical contact: it@entrepreneur-club.org`;

    // send email
    await sendMail(
      '"RocketHub" <rockethub-bot@entrepreneur-club.org>',
      "servicedesk@id.ethz.ch",
      "Internet Access Guest Account Request RocketHub ETH Entrepreneur Club",
      body,
      [email]
    );

    res.status(200).send();
  } catch (error) {
    const typedError = error as Error;
    const message = { message: typedError?.message };

    console.error(message);

    res.status(500).send(message);
  }
};

export default requestInternetAccess;
