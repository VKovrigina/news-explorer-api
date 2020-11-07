const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');
const { ObjectId } = require('mongoose').Types;
const {
  requiredEmailMessage,
  invalidEmailMessage,
  minlengthPasswordMessage,
  requiredPasswordMessage,
  minlengthNameMessage,
  maxlengthNameMessage,
  requiredNameMessage,
  requiredKeywordMessage,
  requiredTitleMessage,
  requiredTextMessage,
  requiredDateMessage,
  requiredSourceMessage,
  invalidLinkMessage,
  requiredLinkMessage,
  requiredImageMessage,
  invalidId,
} = require('../utils/constants');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': requiredEmailMessage,
        'string.email': invalidEmailMessage,
      }),
    password: Joi.string().required().min(5)
      .messages({
        'any.required': requiredPasswordMessage,
        'string.min': minlengthPasswordMessage,
      }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': requiredNameMessage,
        'string.min': minlengthNameMessage,
        'string.max': maxlengthNameMessage,
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': requiredEmailMessage,
        'string.email': invalidEmailMessage,
      }),
    password: Joi.string().required().min(5)
      .messages({
        'any.required': requiredPasswordMessage,
        'string.min': minlengthPasswordMessage,
      }),
  }),
});

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': requiredKeywordMessage,
      }),
    title: Joi.string().required()
      .messages({
        'any.required': requiredTitleMessage,
      }),
    text: Joi.string().required()
      .messages({
        'any.required': requiredTextMessage,
      }),
    date: Joi.string().required()
      .messages({
        'any.required': requiredDateMessage,
      }),
    source: Joi.string().required()
      .messages({
        'any.required': requiredSourceMessage,
      }),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validator.isURL(value)) {
          return helpers.message(invalidLinkMessage);
        }
        return value;
      })
      .messages({
        'any.required': requiredLinkMessage,
      }),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validator.isURL(value)) {
          return helpers.message(invalidLinkMessage);
        }
        return value;
      })
      .messages({
        'any.required': requiredImageMessage,
      }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message(invalidId);
    }),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateCreateArticle,
  validateArticleId,
};
