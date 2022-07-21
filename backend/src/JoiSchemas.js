const Joi = require("joi");

const schemaForCreation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    })
    .required(),
  UserName: Joi.string().min(2).max(255).required(),
  firstname: Joi.string().min(2).max(255).required(),
  messaging: Joi.boolean().truthy(1).falsy(0),
  messagingName: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
});

const schemaForUpdateUser = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32),
  messaging: Joi.boolean().truthy(1).falsy(0),
  messagingName: Joi.string().email({
    minDomainSegments: 2,
    // tlds: { allow: ["com", "net"] },
  }),
});

const schemaForAuthorization = Joi.object({
  authorized: Joi.boolean().falsy(0).truthy(1).required(),
});

const schemaForLogin = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    })
    .required(),
});

const schemaForProject = Joi.object({
  title: Joi.string().max(255),
  text: Joi.string(),
  mission_id: Joi.number().integer().allow(null, ""),
});

const schemaForImages = Joi.object({
  imgLink: Joi.string().max(255),
  alt: Joi.string(),
  article_id: Joi.number().integer(),
  project_id: Joi.number().integer(),
});

module.exports = {
  schemaForCreation,
  schemaForLogin,
  schemaForUpdateUser,
  schemaForAuthorization,
  schemaForProject,
  schemaForImages,
};
