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

class UserController {
  //  Fetches the whole user list, only available to admins and super-admins. Admins can't read RPPS and Adeli numbers
  static browse = (req, res) => {
    return models.user
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static getOrgTree = (req, res) => {
    return models.user
      .findForOrgTree()
      .then(([rows]) => {
        return res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
  };

  //  Checks user role and id, only admins and super-admins can read all users, adherents can read their own data only
  static read = async (req, res) => {
    try {
      const user = await models.user
        .find(parseInt(req.params.id, 10), req.userRole, req.userId)
        .then((userInfo) => userInfo[0][0]);

      if (!user) {
        res.status(404).send(`User ${req.params.id} not found`);
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  //  This is called prior the edit function on the PUT:id route. It checks that the query parameter "?authorize=" is either 0 or 1, if so, it then checks if the user trying to access the route has admin rights, and compares its id to the params id that he wants to authorize, if they are the same it sends an error.
  // It then validates the data through Joi, checks if the account to modify exists and if so, changes the authorized value to the query's one. If there is no query parameter on the route, it then directly proceeds to the following function (in this case, edit)
  static handleAuthorization = async (req, res, next) => {
    //  Sets the object to be sent to the manager from the params ID and "?authorize=" query value
    const authorize = {
      id: parseInt(req.params.id, 10),
      authorized: parseInt(req.query.authorize, 10),
    };
    try {
      if (authorize.authorized === 0 || authorize.authorized === 1) {
        //  Checks for admin rights
        if (req.userRole === "ADMIN" || req.userRole === "SUPER_ADMIN") {
          //  Checks for non-matching IDs between user and user to modify
          if (parseInt(req.params.id, 10) === req.userId) {
            return res.status(403).send("You can not (de-)authorize yourself");
          }
          //  Validates the data
          const validData = await models.user.validateAuthorization({
            authorized: parseInt(req.query.authorize, 10),
          });
          if (!validData) {
            return res
              .status(400)
              .send("Authorized value must be either 1 or 0");
          }
          //  Checks that the user to authorize exists
          const accountExists = await models.user.accountExistCheck(
            parseInt(req.params.id, 10)
          );
          if (!accountExists) {
            return res
              .status(404)
              .send(
                `Can not authorize user ${req.params.id}, because it does not exists`
              );
          }
          //  Authorizes the user
          await models.user.authorizeUser(authorize);
          return res
            .status(200)
            .send(
              `User ${req.params.id} authorization changed to ${authorize.authorized}`
            );
        }
        return res.status(403).send("This account does not have admin rights");
      }
      //  If there is no query parameter on the route, it then directly proceeds to the following function (in this case, edit)
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  //  Checks that the data recieved is valid, checks if the account to be modified exists, then updates the dabase with the new data
  static edit = async (req, res) => {
    const data = req.body;
    const userId = parseInt(req.params.id, 10);
    const imgToDelete = data.imgLink
      ? await models.user.findImgToDelete(userId).then((user) => {
          return user?.imgLink;
        })
      : null;
    const pathImage = data.imgLink
      ? path.join(__dirname, `../../public/assets/images/users/${data.imgLink}`)
      : null;
    try {
      const validData = await models.user.validate(data, false);
      if (!validData) {
        if (data.imgLink) deleteImage(pathImage);
        return res.status(400).send("Data provided is invalid or incomplete");
      }
      const accountExists = await models.user.accountExistCheck(userId);
      if (!accountExists) {
        if (data.imgLink) deleteImage(pathImage);
        return res
          .status(404)
          .send(
            `Can not edit user ${req.params.id}, because it does not exists`
          );
      }
      await models.user.updateUser(data, userId);
      if (imgToDelete)
        deleteImage(
          path.join(
            __dirname,
            `../../public/assets/images/users/${imgToDelete}`
          )
        );
      return res.sendStatus(200);
    } catch (err) {
      if (data.imgLink) deleteImage(pathImage);
      return res.status(500).send(err);
    }
  };

  //  Checks if the account to be deleted exists, then checks if it is an admin or super-admin, if the user who wants to delete is an admin, he can only delete non-admin accounts, if he is a super-admin, he can delete admin and non-admin accounts. Super-admin account CAN NOT be deleted!
  static delete = async (req, res) => {
    const imgToDelete = await models.user
      .findImgToDelete(req.params.id)
      .then((user) => {
        return user?.imgLink;
      });
    try {
      const accountExists = await models.user.accountExistCheck(
        parseInt(req.params.id, 10)
      );
      if (!accountExists) {
        return res
          .status(404)
          .send(
            `Can not delete user ${req.params.id}, because it does not exists`
          );
      }
      const isAdmin = await models.user.accountAdminCheck(
        parseInt(req.params.id, 10),
        false
      );
      const isSuperAdmin = await models.user.accountAdminCheck(
        parseInt(req.params.id, 10),
        true
      );

      if (isAdmin && req.userRole !== "SUPER_ADMIN") {
        return res
          .status(403)
          .send(
            "You can't delete an admin account when you are not a super-admin. Why would you do this anyway?? Monster!"
          );
      }
      if (isSuperAdmin) {
        return res.status(403).send("Super admin account can not be deleted");
      }

      await models.user.delete(req.params.id);
      if (imgToDelete) {
        deleteImage(
          path.join(
            __dirname,
            `../../public/assets/images/users/${imgToDelete}`
          )
        );
      }
      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

  //  User registration function, checks if user is already connected, checks data, checks if email is available, then hashes the password and insert the data into the database
  static register = async (req, res) => {
    const token = req.cookies.accessToken;
    if (token) {
      return res
        .status(403)
        .send("Disconnect from your account before creating a new one");
    }
    const user = req.body;

    if (!user) {
      return res.sendStatus(400);
    }
    try {
      // Checks body data through Joi, if invalid sends an error
      const validData = await models.user.validate(user);
      if (!validData) {
        return res.status(400).send("Data provided is invalid or incomplete");
      }

      // Checks if email is already present in the database, if yes, sends an error
      const emailAlreadyUsed = await models.user.emailAlreadyExist(user.email);
      if (emailAlreadyUsed) {
        return res.status(400).send("Email already exists");
      }

      const hashedPassword = await models.user.hashPassword(user.password);

      models.user
        .insert({ ...user, password: hashedPassword })
        .then(([result]) => {
          delete user.password;
          return res.status(201).json({ ...user, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          return res.sendStatus(500);
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return null;
  };
}

module.exports = UserController;
