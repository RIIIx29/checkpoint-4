const express = require("express");

const userRoutes = require("./user.routes");

const projectRoutes = require("./project.routes");
const imageRoutes = require("./image.routes");
const documentRoutes = require("./document.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/images", imageRoutes);
router.use("/documents", documentRoutes);

module.exports = router;
