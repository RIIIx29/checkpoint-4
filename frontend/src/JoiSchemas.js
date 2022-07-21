import Joi from "joi";
import * as yup from "yup";

const paymentMethods = ["CHEQUE", "VIREMENT"];
const schemaForCreation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  confirmPassword: Joi.string()
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
  address: Joi.string().max(255),
  phone: Joi.string().max(25),
  messaging: Joi.boolean().truthy(1),
  messagingName: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  status: Joi.string().max(255),
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

const schemaForReset = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    })
    .required(),
});

const schemaForResetPassword = yup.object().shape({
  email: yup
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .required(),
  resetCode: yup
    .string()

    .min(5, "Veuillez entrer le bon code.")
    .max(5, "Veuillez entrer le bon code.")
    .required("Le code fourni est requis"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Votre nouveau mot de passe doit comporter au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    )
    .min(8, "Votre nouveau mot de passe doit comporter au moins 8 caractères")
    .max(
      32,
      "Votre nouveau mot de passe peut comporter au maximum 32 caractères"
    )
    .required("Mot de passe requis"),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "La confirmation de votre nouveau mot de passe doit comporter au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    )
    .min(8, "Votre nouveau mot de passe doit comporter au moins 8 caractères")
    .max(
      32,
      "Votre nouveau mot de passe peut comporter au maximum 32 caractères"
    )
    .required("La confirmation de votre nouveau mot de passe est requise")
    .oneOf(
      [yup.ref("password")],
      "Votre nouveau mot de passe et la confirmation de votre nouveau mot de passe doivent être identiques"
    ),
});
const schemaForDocument = Joi.object({
  title: Joi.string().max(255),
  description: Joi.string(),
  public: Joi.boolean().falsy(0).truthy(1),
  mission_id: Joi.number().integer().allow(null, ""),
  project_id: Joi.number().integer().allow(null, ""),
});

export {
  schemaForCreation,
  schemaForUpdateUser,
  schemaForAuthorization,
  schemaForLogin,
  schemaForReset,
  schemaForResetPassword,
  schemaForDocument,
};
