const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");

const handleAuthError = (res, e) => {
  console.error(e);
  res.status(ERROR_401).send({ message: "Authorization Error" });
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return handleAuthError(res, e);
  }

  req.user = payload;

  next();

  return null;
};
