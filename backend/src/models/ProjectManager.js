/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const AbstractManager = require("./AbstractManager");
const { schemaForProject } = require("../JoiSchemas");

class ProjectManager extends AbstractManager {
  static table = "project";

  findAll() {
    return this.connection.query(`SELECT * FROM  ${ProjectManager.table}`);
  }

  findById(projectId) {
    return this.connection.query(
      `SELECT * FROM ${ProjectManager.table} WHERE id = ?`,
      [projectId]
    );
  }

  insert(project) {
    return this.connection.query(`INSERT INTO ${ProjectManager.table} SET ?`, [
      project,
    ]);
  }

  update(project, projectId) {
    return this.connection.query(
      `UPDATE ${ProjectManager.table} SET  ? WHERE id = ? `,
      [project, projectId]
    );
  }

  async validate(project) {
    try {
      await schemaForProject.validateAsync(project);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = ProjectManager;
