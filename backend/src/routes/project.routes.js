const express = require("express");

const {
  ProjectController,
  AuthController,
  FileController,
} = require("../controllers");

const router = express.Router();

router.get("/", ProjectController.browse);
router.get(
  "/:id",
  AuthController.canGetProjectDocument,
  ProjectController.readById
);
router.get("/mission/:id", ProjectController.readByMission);

router.post(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  FileController.uploadProject,
  ProjectController.add
);

router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  FileController.uploadProject,
  ProjectController.edit
);

router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  ProjectController.delete
);

module.exports = router;
