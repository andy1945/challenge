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

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You must be an admin to access this resource." });
    }
    next();
  } catch (err) {
    next(err);
  }
};

// Revenue aggregation endpoint
router.get("/", authenticate, async (req, res, next) => {
  try {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get the clients
    const clients = await getClients();

    // Aggregate revenue by country
    const revenueByCountry = clients.reduce((acc, client) => {
      acc[client.country] = (acc[client.country] || 0) + client.revenue;
      return acc;
    }, {});

    // Return aggregated revenue by country
    res.status(200).json(revenueByCountry);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware for unauthorized access
router.use((err, req, res, next) => {
  if (err instanceof UnauthorizedError) {
    return res.status(403).json({ message: err.message });
  }
  next(err); // Pass to default error handler
});

export default router;
