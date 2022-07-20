const express = require("express");

const { AuthController, FileController } = require("../controllers");

const router = express.Router();

router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  FileController.delete
);

module.exports = router;
