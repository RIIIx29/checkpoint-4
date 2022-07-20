const express = require("express");

const {
  DocumentController,
  AuthController,
  FileController,
} = require("../controllers");

const router = express.Router();

router.get(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  DocumentController.browse
);
router.get(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  DocumentController.readById
);
router.get(
  "/mission/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  DocumentController.readByMission
);
router.post(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  FileController.uploadDocument,
  DocumentController.add
);

router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  FileController.uploadDocument,
  DocumentController.edit
);

router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAuthorized,
  AuthController.isUserAdmin,
  DocumentController.delete
);

module.exports = router;
