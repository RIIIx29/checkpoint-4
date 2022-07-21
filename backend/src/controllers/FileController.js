const multer = require("multer");
const fs = require("fs");
const path = require("path");
const models = require("../models");

const deleteImage = (pathImage) => {
  try {
    fs.unlinkSync(pathImage);
  } catch (err) {
    console.error(err);
  }
};

let fileName = "";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, `../../public/assets/images/${fileName}`));
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".");
    if (req.query.file === "users") {
      cb(
        null,
        `${Date.now()}-${req.userFirstname}-${req.userLastname}.${extension[1]}`
      );
    } else if (req.query.file === "letter") {
      cb(null, `${Date.now()}-president.${extension[1]}`);
    } else if (req.query.file === "reglement") {
      if (req.query.type === "reglement") {
        cb(null, `${Date.now()}-reglement.${extension[1]}`);
      } else if (req.query.type === "status") {
        cb(null, `${Date.now()}-status.${extension[1]}`);
      }
    } else {
      cb(
        null,
        `${Date.now()}-${Math.floor(Math.random() * (9999 - 0 + 1)) + 0}-${
          file.originalname
        }`
      );
    }
  },
});

const uploadSingle = multer({ storage }).single("file");
const uploadMultiple = multer({ storage }).array("file");

class ImageController {
  static uploadLetter = (req, res, next) => {
    fileName = "letter";
    if (req.query.file === "letter") {
      return uploadSingle(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        req.pictureData = {
          imgLink: req.file.filename,
        };
        req.body = { ...req.pictureData, ...JSON.parse(req.body.newLetter) };
        return next();
      });
    }
    return next();
  };

  static uploadReglement = (req, res, next) => {
    fileName = "reglement-status";
    return uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      req.resourceData = {
        rscLink: req.file.filename,
      };
      req.body = { ...req.resourceData };
      return next();
    });
  };

  static uploadUser = (req, res, next) => {
    fileName = "users";
    if (req.query.file === "users") {
      return uploadSingle(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        req.pictureData = {
          imgLink: req.file.filename,
        };
        req.body = { ...req.pictureData, ...req.body };
        return next();
      });
    }
    return next();
  };

  static uploadDocument = (req, res, next) => {
    fileName = "documents";
    if (req.query.file === "documents") {
      return uploadSingle(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        req.documentData = {
          rscLink: req.file.filename,
          alt: req.file.originalname.split(".")[0],
        };
        req.body = { ...req.documentData, ...JSON.parse(req.body.newDocument) };
        return next();
      });
    }
    return next();
  };

  static uploadArticles = (req, res, next) => {
    fileName = "articles";
    if (req.query.file === "articles") {
      return uploadMultiple(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        req.body = { ...JSON.parse(req.body.articleData) };
        return next();
      });
    }
    return next();
  };

  static uploadProject = (req, res, next) => {
    fileName = "projects";
    if (req.query.file === "projects") {
      return uploadMultiple(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        req.body = { ...JSON.parse(req.body.projectData) };
        return next();
      });
    }
    return next();
  };

  static delete = async (req, res) => {
    const imageId = parseInt(req.params.id, 10);
    try {
      const [image] = await models.image.findImageById(imageId);
      if (!image) {
        return res.status(404).send(`Image with id : ${imageId} not found`);
      }
      const deletedImg = await models.image.deleteImage(imageId);
      if (deletedImg.affectedRows === 0) {
        return res.status(404).send("error in deleting the image");
      }
      deleteImage(
        path.join(
          __dirname,
          `../../public/assets/images/${req.query.file}/${image.imgLink}`
        )
      );
      return res.status(204).send("image deleted successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = ImageController;
