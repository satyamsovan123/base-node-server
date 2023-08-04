const Joi = require("joi");
const { fieldConstant, responseConstant } = require("../../../constants");

const signInValidatorSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.alphanum": `${fieldConstant.USERNAME} should only have alphanumeric characters.`,
      "string.base": `${fieldConstant.USERNAME} should only have alphanumeric characters.`,
      "string.empty": `${fieldConstant.USERNAME} ${responseConstant.CANNOT_BE_EMPTY}`,
      "string.min": `${fieldConstant.USERNAME} should have atleast {#limit} characters.`,
      "string.max": `${fieldConstant.USERNAME} should have atmost {#limit} characters.`,
      "any.required": `${fieldConstant.USERNAME} ${responseConstant.IS_REQUIRED}`,
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      "any.required": `${fieldConstant.PASSWORD} ${responseConstant.IS_REQUIRED}`,
      "string.pattern.base": `${fieldConstant.PASSWORD} ${responseConstant.IS_INVALID}`,
      "string.empty": `${fieldConstant.PASSWORD} ${responseConstant.CANNOT_BE_EMPTY}`,
    }),
}).messages({
  "object.unknown": `${responseConstant.PLEASE_REMOVE_EXTRA_FIELDS}`,
});

module.exports = { signInValidatorSchema };
