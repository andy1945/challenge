import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors.js";
import { readDataJson } from "../utils/fs.js";

// in seconds, made this short on purpose
const jwtExpiresIn = 60 * 2;
const jwtSecret = "senchou";

const createJwt = (user) => {
  // in seconds
  const expires = Math.floor(Date.now() / 1000) + jwtExpiresIn;
  const token = jwt.sign({ ...user, exp: expires }, jwtSecret, {
    algorithm: "HS256",
  });
  return { accessToken: token, expires };
};

export const authenticateUser = async (email, password) => {
  const users = await readDataJson("users");
  const { password: userPassword, ...user } =
    users.find((u) => u.email === email) || {};
  if (!user || userPassword !== password) {
    throw new UnauthorizedError();
  }
  return createJwt(user);
};

export const verifyToken = (token) => {
  try {
    // Verifying and decoding the token
    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ["HS256"],
    });

    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err);
    throw new UnauthorizedError("Invalid or expired token.");
  }
};
