const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isUrl(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.name": "The `name` field must be filled out",
      "string.min": "The required length must be more than 2 characters",
      "string.max": "The required length must be less than 30 characters",
    }),
    imageUrl: Joi.required().custom(validateUrl).messages({
      "string.empty": "The `imageUrl` field cannot be empty",
      "string.uri": "The `imageUrl` field must contain a url",
    }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.name": "The `name` field must be filled out",
      "string.min": "The required length must be more than 2 characters",
      "string.max": "The required length must be less than 30 characters",
    }),
    avatar: Joi.string().empty("").custom(validateUrl).messages({
      "string.uri": "The `avatar` field must contain a url",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The `email` field must be filled out",
      "string.email": "The `email` field must contain a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The `password` field must be filled out",
    }),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The `email` field must be filled out",
      "string.email": "The `email` field must contain a valid email",
    }),
    password: Joi.string.required().messages({
      "string.empty": "The `password` field must be filled out",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).messages({
      "string.hex": "The `id` should be in hexadecimal form",
      "string.length": "The `id` should be 24 characters long",
    }),
  }),
});

module.exports = {
  validateItem,
  validateUser,
  validateSignin,
  validateId,
};
