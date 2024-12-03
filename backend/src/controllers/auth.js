import { Router } from "express";
import { authenticateUser } from "../services/auth.js";
import { UnauthorizedError } from "../utils/errors.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.indexOf("Basic ") === -1) {
      throw new UnauthorizedError("Missing Authorization header");
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [email, password] = credentials.split(":");

    const user = await authenticateUser(email, password);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
