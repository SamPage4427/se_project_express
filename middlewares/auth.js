const jwt = require("jsonwebtoken");

const { JWT_SECRET, NODE_ENV } = process.env;
const UnauthorizedError = require("../errors/UnauthorizedError");

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization token is missing");
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "some-secret-key"
    );
  } catch (e) {
    return next(new UnauthorizedError("Authorization token is incorrect"));
  }

  req.user = payload;

  next();

  return null;
};
