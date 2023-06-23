/* 400 - invalid id or invalid data
  404 - user/item does not exist or was sent to non-existent page
  500 - default error */

// 400 e.name = ValidationError, CastError
// 404 e.name = DocumentNotFoundError
// 500 e.name = InternalServerError, defaultError

const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_403 = 403;
const ERROR_404 = 404;
const ERROR_409 = 409;
const ERROR_500 = 500;

const itemError = (req, res, e) => {
  if (e.name === "ValidationError") {
    return res.status(ERROR_400).send({ message: "Invalid Data Input" });
  }
  if (e.name === "CastError") {
    return res.status(ERROR_400).send({ message: "Invalid ID" });
  }
  if (e.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({ message: "Error: Not Found" });
  }
  return res
    .status(ERROR_500)
    .send({ message: "An error has occured on the server" });
};

module.exports = {
  ERROR_404,
  ERROR_401,
  ERROR_403,
  ERROR_409,
  itemError,
};
