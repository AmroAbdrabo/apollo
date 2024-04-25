import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "rockethub-bot@entrepreneur-club.org",
    pass: "!U763kLm29!9",
  },
});

const sendMail = async (
  from: string,
  to: string,
  subject: string,
  text: string,
  cc?: string[]
) => {
  // create email info
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    cc,
  });
};

export default sendMail;
