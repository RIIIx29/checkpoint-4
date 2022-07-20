const AbstractManager = require("./AbstractManager");

class ImageManager extends AbstractManager {
  static table = "image";

  insert(fileName) {
    return this.connection.query(`INSERT INTO ${ImageManager.table} SET ?`, [
      fileName,
    ]);
  }

  findImageById(imageId) {
    return this.connection
      .query(`SELECT * FROM ${ImageManager.table} WHERE id = ?`, [imageId])
      .then((result) => result[0]);
  }

  findProjectImage(projectId) {
    return this.connection
      .query(`SELECT * FROM ${ImageManager.table} WHERE project_id = ?`, [
        projectId,
      ])
      .then((result) => result[0]);
  }

  findArticlesImage(articlesId) {
    return this.connection
      .query(`SELECT * FROM ${ImageManager.table} WHERE article_id = ?`, [
        articlesId,
      ])
      .then((result) => result[0]);
  }

  deleteImage(imageId) {
    return this.connection.query(
      `DELETE FROM ${ImageManager.table} WHERE id = ?`,
      [imageId]
    );
  }

  deleteArticleImage(articleId) {
    return this.connection.query(
      `DELETE FROM ${ImageManager.table} WHERE article_id = ?`,
      [articleId]
    );
  }

  deleteProjectImage(projectId) {
    return this.connection.query(
      `DELETE FROM ${ImageManager.table} WHERE project_id = ?`,
      [projectId]
    );
  }
}

module.exports = ImageManager;
