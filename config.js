const responseCode = {
  InternalServerError: 500,
  BadRequest: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  Success: 200,
  ServiceUnavailable: 503,
  NotAuthorized: 401,
  NotValid: 400,
};

const jwtSecret = "mySecret";

module.exports = { responseCode, jwtSecret };
