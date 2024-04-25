import { Request, Response } from "express";
import { API, Auth } from "../../../shared/types";
import { auth } from "../firebase";

const disableUsers = async (req: Request, res: Response) => {
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

    const { userIds } = req.body as API.DisableUsers.Request;

    await userIds.map(async (uid) => {
      await auth.updateUser(uid, {
        disabled: true,
      });
    });
  } catch (error) {
    const typedError = error as Error;
    const message = { message: typedError?.message };

    console.error(message);

    res.status(500).send(message);
  }
};

export default disableUsers;
