import { Router } from "express";
import { getClients } from "../services/clients.js";
import { verifyToken } from "../services/auth.js";
import { UnauthorizedError } from "../utils/errors.js";

const router = Router();
// Middleware for token verification

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authorization token missing or invalid.");
    }

    const token = authHeader.split(" ")[1];
    console.log("token====" + token);
    req.user = verifyToken(token); // Attach decoded token to the request
    next();
  } catch (err) {
    next(err);
  }
};
router.get("/", authenticate, async (req, res, next) => {
  try {
    // simulate delay
    await new Promise((res) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    return res.status(200).json(await getClients());
  } catch (err) {
    next(err);
  }
});

export default router;
