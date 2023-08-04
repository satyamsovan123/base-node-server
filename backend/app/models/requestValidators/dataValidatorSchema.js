const Joi = require("joi");
const { fieldConstant, responseConstant } = require("../../../constants");

const dataValidatorSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(80)
    .required()
    .messages({
      "string.empty": `${fieldConstant.TITLE} ${responseConstant.CANNOT_BE_EMPTY}`,
      "string.min": `${fieldConstant.TITLE} should have atleast {#limit} characters.`,
      "string.max": `${fieldConstant.TITLE} should have atmost {#limit} characters.`,
      "any.required": `${fieldConstant.TITLE} ${responseConstant.IS_REQUIRED}`,
    }),

  article: Joi.string()
    .min(20)
    .required()
    .messages({
      "string.empty": `${fieldConstant.ARTICLE} ${responseConstant.CANNOT_BE_EMPTY}`,
      "string.min": `${fieldConstant.ARTICLE} should have atleast {#limit} characters.`,
      "any.required": `${fieldConstant.ARTICLE} ${responseConstant.IS_REQUIRED}`,
    }),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .messages({
      "string.alphanum": `${fieldConstant.USERNAME} should only have alphanumeric characters.`,
      "string.base": `${fieldConstant.USERNAME} should only have alphanumeric characters.`,
      "string.empty": `${fieldConstant.USERNAME} ${responseConstant.CANNOT_BE_EMPTY}`,
      "string.min": `${fieldConstant.USERNAME} should have atleast {#limit} characters.`,
      "string.max": `${fieldConstant.USERNAME} should have atmost {#limit} characters.`,
    }),
}).messages({
  "object.unknown": `${responseConstant.PLEASE_REMOVE_EXTRA_FIELDS}`,
});

module.exports = { dataValidatorSchema };
