const express = require("express");

const {
  UserController,
  AuthController,
  FileController,
} = require("../controllers");

const router = express.Router();

//  Register, login and logout routes
router.post("/", UserController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

//  User CRUD routes
router.get(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  UserController.browse
);
router.get("/orgtree", UserController.getOrgTree);
router.get(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAllowedToGet,
  UserController.read
);
router.put(
  //  This route accepts a query parameter available only to admins, it is used to authorize or de-authorize a user: ?authorize=0 or 1
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAllowedToModifyUser,
  UserController.handleAuthorization,
  FileController.uploadUser,
  UserController.edit
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  UserController.delete
);

module.exports = router;
