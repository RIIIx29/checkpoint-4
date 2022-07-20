/* eslint-disable no-param-reassign */
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

class ProjectController {
  static browse = async (req, res) => {
    try {
      const [projects] = await models.project.findAll();
      await projects.forEach((project) => {
        if (project.mission_name === null) {
          project.mission_name = "";
        }
        return project;
      });
      return res.status(200).send(projects);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  static readById = async (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    try {
      const [[project]] = await models.project.findById(projectId);
      if (!project) {
        return res.status(404).send(`No project found with id: ${projectId}`);
      }
      project.images = await models.image.findProjectImage(projectId);
      project.articles = await models.article.findByProject(projectId);
      project.documents = await models.document.findByProject(
        projectId,
        req.authorized
      );
      return res.status(200).send(project);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  static edit = async (req, res) => {
    const project = JSON.parse(JSON.stringify(req.body));
    const { files } = req;
    const projectId = parseInt(req.params.id, 10);
    const imageName = files
      ? files.map((file) => {
          return file.filename;
        })
      : null;
    try {
      if (!Object.keys(project).length && files) {
        const images = files
          ? files.map((file) => {
              return {
                imgLink: file.filename,
                project_id: projectId,
                alt: file.filename,
              };
            })
          : null;
        if (images) {
          await images.forEach(async (image) => {
            const newImage = await models.image.insert(image);
            if (newImage.affectedRows === 0) {
              deleteImage(
                path.join(
                  __dirname,
                  `../../public/assets/images/projects/${image.imgLink}`
                )
              );
              return res.status(400).send("error in uploading image");
            }
            return null;
          });
        }
        return res.status(200).send("image added successfully");
      }
      const valideData = await models.project.validate(project);
      if (!valideData) {
        if (imageName) {
          await imageName.forEach((image) =>
            deleteImage(
              path.join(
                __dirname,
                `../../public/assets/images/projects/${image}`
              )
            )
          );
        }
        return res.status(400).send("data invalid");
      }
      const projectUpdated = await models.project.update(project, projectId);
      if (!projectUpdated.affectedRows === 0) {
        if (imageName) {
          await imageName.forEach((image) =>
            deleteImage(
              path.join(
                __dirname,
                `../../public/assets/images/projects/${image}`
              )
            )
          );
        }
        return res.status(404).send("error in updating project");
      }
      const images = files
        ? files.map((file) => {
            return {
              imgLink: file.filename,
              project_id: projectId,
              alt: file.filename,
            };
          })
        : null;
      if (images) {
        await images.forEach(async (image) => {
          await models.image.insert(image);
        });
      }
      return res.status(200).send("project updated successfully");
    } catch (err) {
      if (imageName) {
        await imageName.forEach((image) =>
          deleteImage(
            path.join(__dirname, `../../public/assets/images/projects/${image}`)
          )
        );
      }
      return res.status(500).send(err.message);
    }
  };

  static add = async (req, res) => {
    const project = req.body;
    const { files } = req;
    const imageName = files
      ? files.map((file) => {
          return file.filename;
        })
      : null;
    try {
      const valideData = await models.project.validate(project);
      if (!valideData) {
        if (imageName) {
          await imageName.forEach((image) =>
            deleteImage(
              path.join(
                __dirname,
                `../../public/assets/images/projects/${image}`
              )
            )
          );
        }
        return res.status(400).send("Please insert valid data");
      }
      const [newProject] = await models.project.insert(project);
      if (!newProject) {
        if (imageName) {
          await imageName.forEach((image) =>
            deleteImage(
              path.join(
                __dirname,
                `../../public/assets/images/projects/${image}`
              )
            )
          );
        }
        return res.status(400).send("error in creating project");
      }
      const images = files
        ? files.map((file) => {
            return {
              imgLink: file.filename,
              project_id: newProject.insertId,
              alt: file.originalname,
            };
          })
        : null;
      if (images) {
        await images.forEach(async (image) => {
          await models.image.insert(image);
        });
      }
      return res.status(201).send("project created");
    } catch (err) {
      if (imageName) {
        await imageName.forEach((image) =>
          deleteImage(
            path.join(__dirname, `../../public/assets/images/projects/${image}`)
          )
        );
      }
      return res.status(500).send(err.message);
    }
  };

  static delete = async (req, res) => {
    try {
      const projectsImage = await models.image.findProjectImage(req.params.id);
      const imageName = projectsImage.length
        ? projectsImage.map((projectImage) => {
            return projectImage.imgLink;
          })
        : null;
      const [deletedProject] = await models.project.delete(req.params.id);
      if (deletedProject.affectedRows === 0) {
        return res.status(404).send("Error in erasing project");
      }
      if (imageName) {
        await imageName.forEach((image) =>
          deleteImage(
            path.join(__dirname, `../../public/assets/images/projects/${image}`)
          )
        );
      }
      return res.status(200).send("project deleted");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = ProjectController;
