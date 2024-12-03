export class StatusedError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class HttpError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export class BadRequestError extends HttpError {
  constructor(errors) {
    super("Bad Request", 400, errors);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
