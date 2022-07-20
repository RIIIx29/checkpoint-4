const Joi = require("joi");

const paymentMethods = ["CHEQUE", "VIREMENT"];
const roles = ["ADMIN", "ADHERENT"];

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
  profession: Joi.string().max(255).allow(null, ""),
  lastname: Joi.string().min(2).max(255).required(),
  firstname: Joi.string().min(2).max(255).required(),
  address: Joi.string().max(255).required(),
  phone: Joi.string().max(25).required(),
  messaging: Joi.boolean().truthy(1).falsy(0),
  messagingName: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .allow(null, ""),
  status: Joi.string().max(255).required(),
  rpps: Joi.string().min(11).max(11).allow(null, ""),
  adeli: Joi.string().min(9).max(9).allow(null, ""),
  paymentMethod: Joi.string()
    .valid(...paymentMethods)
    .required(),
});

const schemaForUpdateUser = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32),
  address: Joi.string().max(255),
  phone: Joi.string().max(25),
  messaging: Joi.boolean().truthy(1).falsy(0),
  messagingName: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .allow(null, ""),
  status: Joi.string().max(255),
  role: Joi.string().valid(...roles),
  rpps: Joi.string().min(11).max(11).allow(null, ""),
  adeli: Joi.string().min(9).max(9).allow(null, ""),
  imgLink: Joi.string().max(80),
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

const schemaForEditLetter = Joi.object({
  letter: Joi.string().max(2000),
  imgLink: Joi.string().max(80),
});

const schemaForMessage = Joi.object({
  text: Joi.string().max(500),
});

const schemaForProject = Joi.object({
  title: Joi.string().max(255),
  text: Joi.string(),
  mission_id: Joi.number().integer().allow(null, ""),
});

const schemaForArticles = Joi.object({
  title: Joi.string().max(255),
  text: Joi.string(),
  pressLink: Joi.string(),
  type: Joi.string(),
  mission_id: Joi.number().integer().allow(null, ""),
  project_id: Joi.number().integer().allow(null, ""),
  posted_by: Joi.number().integer().allow(null, ""),
});

const schemaForDocument = Joi.object({
  title: Joi.string().max(255),
  rscLink: Joi.string().max(255),
  description: Joi.string(),
  alt: Joi.string(),
  public: Joi.boolean().falsy(0).truthy(1),
  mission_id: Joi.number().integer().allow(null, ""),
  project_id: Joi.number().integer().allow(null, ""),
});

const schemaForEditReglement = Joi.object({
  rscLink: Joi.string().max(255).required(),
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
  schemaForMessage,
  schemaForUpdateUser,
  schemaForAuthorization,
  schemaForEditLetter,
  schemaForProject,
  schemaForArticles,
  schemaForEditReglement,
  schemaForDocument,
  schemaForImages,
};
