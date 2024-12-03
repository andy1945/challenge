import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { NotFoundError, StatusedError } from "./utils/errors.js";

import * as controllers from "./controllers/index.js";

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Authorization, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,OPTIONS,DELETE,UPDATE"
  );
  next();
});

app.options("/*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Authorization, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,OPTIONS,DELETE,UPDATE"
  );
  res.sendStatus(200);
});

app.use("/auth", controllers.authController);
app.use("/clients", controllers.clientsController);
app.use("/admin", controllers.adminController);

app.use((req, res, next) => {
  const error = new NotFoundError();
  next(error);
});

// eslint-disable-next-line
app.use((error, req, res, _next) => {
  // Validation error
  if (error.errors) {
    const errors = {};
    error.errors.forEach((verr, index) => {
      const errorKey = verr.param;
      if (errors[errorKey] && errors[errorKey] !== verr.msg) {
        // Duplicate key and different message
        errors[errorKey + (index + 1)] = verr.msg;
      } else {
        errors[verr.param] = verr.msg;
      }
    });
    res.status(400).json({
      error: {
        message: error.message,
        details: errors,
      },
    });
    return;
  }

  const errorStatus = !(error instanceof StatusedError) && error.status;

  if (!errorStatus || errorStatus === 500) {
    console.error(error.stack);
  } else {
    console.warn(error.message);
  }

  res.status(errorStatus || 500).send({
    error: {
      message: error.message,
    },
  });
});

export default app;
