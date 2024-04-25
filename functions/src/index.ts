import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import {
  approveCompany,
  createAccount,
  createCompany,
  generateInvitationCode,
  verifyInvitationCode,
  requestInternetAccess,
  disableUsers,
  contactMentor,
} from "./api";

// initialize express server
const app = express();
const main = express();

// use middleware
main.use(cors());
app.use(cors());

// add base api path
main.use("/api/v1", app);

// add request paths
app.post("/generateInvitationCode", generateInvitationCode);
app.post("/verifyInvitationCode", verifyInvitationCode);
app.post("/createAccount", createAccount);
app.post("/createCompany", createCompany);
app.post("/approveCompany", approveCompany);
app.post("/requestInternetAccess", requestInternetAccess);
app.post("/disableUsers", disableUsers);
app.post("/contactMentor", contactMentor);

// export
const rockethub = functions.https.onRequest(main);
export { rockethub };
