import { Request, Response } from "express";
import { API } from "../../../shared/types";
import sendMail from "../mail/mail";

const contactMentor = async (req: Request, res: Response) => {
  // get data from request
  try {
    const {
      mentorName,
      mentorEmail,
      userName,
      userEmail,
      companyName,
      companyDescription,
      topic,
      meetingDates,
      preferredMeetingType,
    } = req.body as API.ContactMentor.Request;

    if (meetingDates.length !== 3) {
      res.status(400).send();
    }

    // format body
    const body = `Dear ${mentorName},     

${userName} from the startup ${companyName} would like meet you as part of the ETH Entrepreneur Club Startup Mentoring program. 

Topic of Feedback:
${topic}

Meeting Time Suggestions:
- ${meetingDates[0]}
- ${meetingDates[1]}
- ${meetingDates[2]}

Preferred Meeting type:
${preferredMeetingType}

Startup Description:
${companyDescription}

If these times do not fit your schedule, we would be grateful if you could suggest some times yourself. 

Thank you very much for your participation in the program! 

Best regards, 
The RocketHub team`;

    // send email
    await sendMail(
      '"RocketHub" <rockethub-bot@entrepreneur-club.org>',
      `${mentorEmail}; ${userEmail}`,
      "Entrepreneur Club Meeting Request",
      body,
      ["leopold.franz@entrepreneur-club.org"]
    );

    res.status(200).send();
  } catch (error) {
    const typedError = error as Error;
    const message = { message: typedError?.message };

    console.error(message);

    res.status(500).send(message);
  }
};

export default contactMentor;
