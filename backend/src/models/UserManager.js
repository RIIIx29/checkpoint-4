/* eslint-disable class-methods-use-this */
const argon2 = require("argon2");
const AbstractManager = require("./AbstractManager");
const {
  schemaForCreation,
  schemaForUpdateUser,
  schemaForAuthorization,
  schemaForLogin,
} = require("../JoiSchemas");

class UserManager extends AbstractManager {
  static table = "user";

  hashPassword(userPassword) {
    return argon2.hash(userPassword);
  }

  verifyPassword(userPassword, hashedPassword) {
    return argon2.verify(hashedPassword, userPassword);
  }

  tempCode(resetCode, id) {
    this.connection.query(
      `update ${UserManager.table} set resetCode=? WHERE id=?`,
      [resetCode, id]
    );
  }

  async loginValidate(user) {
    try {
      await schemaForLogin.validateAsync(user);
      return true;
    } catch (err) {
      return false;
    }
  }

  async findByEmail(email) {
    const user = await this.connection.query(
      `SELECT id, firstname, lastname, email,resetCode, role, imgLink, authorized FROM ${UserManager.table} WHERE email = ?`,
      [email]
    );
    return user[0];
  }

  async findById(id) {
    const user = await this.connection.query(
      `SELECT id, firstname, lastname, email,resetCode,password, role, imgLink, authorized FROM ${UserManager.table} WHERE id = ?`,
      [id]
    );
    return user[0];
  }

  async findForOrgTree() {
    const user = await this.connection.query(
      `SELECT id, firstname, lastname, profession, address, assosStatus, imgLink FROM ${UserManager.table} WHERE authorized = 1`
    );
    return user;
  }

  async accountExistCheck(id) {
    const account = await this.connection
      .query(`SELECT id FROM ${this.table} WHERE id = ?`, [id])
      .then((accountId) => accountId[0][0]);
    if (!account) {
      return false;
    }
    return true;
  }

  async accountAdminCheck(id, superAdmin) {
    if (!superAdmin) {
      const isAdmin = await this.connection
        .query(`SELECT role FROM user WHERE id = ?`, [id])
        .then((role) => role[0][0]);
      if (isAdmin.role === "SUPER_ADMIN" || isAdmin.role === "ADMIN") {
        return true;
      }
      return false;
    }
    if (superAdmin) {
      const isSuperAdmin = await this.connection
        .query(`SELECT role FROM user WHERE id = ?`, [id])
        .then((role) => role[0][0]);
      if (isSuperAdmin.role === "SUPER_ADMIN") {
        return true;
      }
      return false;
    }
    return null;
  }

  async passwordCheck(email, userPassword) {
    const password = await this.connection.query(
      `SELECT password FROM ${UserManager.table} WHERE email = ?`,
      [email]
    );
    return this.verifyPassword(userPassword, password[0][0].password);
  }

  find(id, userRole, userId) {
    if (userRole === "SUPER_ADMIN" || userId === id) {
      return this.connection.query(
        `SELECT id,
      email,
      profession,
      lastname,
      firstname,
      address,
      phone,
      messaging,
      messagingName,
      status,
      assosStatus,
      rpps,
      adeli,
      paymentMethod,
      role,
      imgLink,
      authorized,
      registerDate FROM ${this.table} WHERE id = ?`,
        [id]
      );
    }
    if (userRole === "ADMIN") {
      return this.connection.query(
        `SELECT id,
    email,
    profession,
    lastname,
    firstname,
    address,
    phone,
    messaging,
    messagingName,
    status,
    assosStatus,
    paymentMethod,
    role,
    imgLink,
    authorized,
    registerDate FROM ${this.table} WHERE id = ?`,
        [id]
      );
    }
    return false;
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  findAllInactive(userRole) {
    if (userRole === "SUPER_ADMIN") {
      return this.connection.query(`SELECT id,
      email,
      profession,
      lastname,
      firstname,
      address,
      phone,
      messaging,
      messagingName,
      status,
      assosStatus,
      rpps,
      adeli,
      imgLink,
      paymentMethod,
      role,
      authorized,
      registerDate FROM ${this.table} WHERE authorized = 0`);
    }
    return this.connection.query(
      `SELECT id,
  email,
  profession,
  lastname,
  firstname,
  address,
  phone,
  messaging,
  messagingName,
  status,
  assosStatus,
  paymentMethod,
  role,
  imgLink,
  authorized,
  registerDate FROM ${this.table} WHERE authorized = 0`
    );
  }

  insert(user) {
    const {
      password,
      email,
      profession,
      lastname,
      firstname,
      address,
      phone,
      messaging,
      status,
      rpps,
      adeli,
      paymentMethod,
    } = user;

    return this.connection.query(
      `INSERT INTO ${UserManager.table} (password, email, profession, lastname,
        firstname,
        address,
        phone,
        messaging,
        status,
        rpps,
        adeli,
        paymentMethod ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        password,
        email,
        profession,
        lastname,
        firstname,
        address,
        phone,
        messaging,
        status,
        rpps,
        adeli,
        paymentMethod,
      ]
    );
  }

  findResetCode(id) {
    return this.connection.query(
      `SELECT resetCode, email FROM ${UserManager.table} WHERE id = ?`,
      [id]
    );
  }

  updateUser(data, userId) {
    return this.connection.query(
      `UPDATE ${UserManager.table} SET ? WHERE id = ? `,
      [data, userId]
    );
  }

  authorizeUser(authorize) {
    const { authorized, id } = authorize;
    return this.connection.query(
      `UPDATE ${UserManager.table} SET authorized = ? WHERE id = ?`,
      [authorized, id]
    );
  }

  emailAlreadyExist(email) {
    return this.connection
      .query(`SELECT * FROM ${UserManager.table} WHERE email = ?`, [email])
      .then(([result]) => result.length);
  }

  findImgToDelete(userId) {
    return this.connection
      .query(`SELECT imgLink FROM ${UserManager.table} WHERE id = ?`, [userId])
      .then(([result]) => result[0]);
  }

  async validate(user, creation = true) {
    try {
      if (creation) {
        await schemaForCreation.validateAsync(user);
      } else {
        await schemaForUpdateUser.validateAsync(user);
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async validateAuthorization(input) {
    try {
      await schemaForAuthorization.validateAsync(input);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = UserManager;
