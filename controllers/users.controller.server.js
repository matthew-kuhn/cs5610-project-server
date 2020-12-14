const usersDao = require("../daos/users.dao.server");
module.exports = (app) => {
  const register = (req, res) => {
    const adminKey = "xXx_supersecretadminkey_xXX";
    const tempUser = req.body;
    let newUser = {};
    if (tempUser.role === "admin") {
      if (tempUser.adminKey === adminKey) {
        newUser.username = tempUser.username;
        newUser.password = tempUser.password;
        newUser.role = "admin";
        newUser.name = tempUser.name;
        if (
          usersDao.findUserByUsername(newUser.username).then((user) => {
            if (user) {
              res.sendStatus(400).send({ message: "User name already exists" });
            }
          })
        )
          usersDao.createUser(newUser).then((actualUser) => {
            req.session["currentUser"] = actualUser;
            res.json(actualUser);
          });
        return;
      } else {
        res.sendStatus(400).send({
          message: "Admin Key incorrect",
        });
        return;
      }
    } else {
      newUser.username = tempUser.username;
      newUser.password = tempUser.password;
      newUser.role = "user";
      newUser.name = tempUser.name;
      if (
        usersDao.findUserByUsername(newUser.username).then((user) => {
          if (user) {
            res.sendStatus(400).send({ message: "User name already exists" });
          }
        })
      )
        usersDao.createUser(newUser).then((actualUser) => {
          req.session["currentUser"] = actualUser;
          res.json(actualUser);
        });
    }
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    usersDao.findUserByCredentials(username, password).then((user) => {
      //console.log('got user', user, ' from db for username', username)
      if (user) {
        req.session.regenerate(() => {
          req.session["currentUser"] = user;
          // console.log("session id:", req.sessionID);
          res.send(user);
        });
      } else {
        res.sendStatus(403).send({ message: "Invalid Username or Password" });
      }
    });
  };

  const currentUser = (req, res) => {
    // console.log(req.session);
    if (req.session["currentUser"]) {
      res.json(req.session["currentUser"]);
    } else {
      res.sendStatus(403);
    }
  };

  const getUser = (req, res) => {
    const username = req.params.username;
    usersDao.findUserByUsername(username).then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(403);
      }
    });
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const blockUser = (req, res) => {
    const currentAdmin = req.session["currentUser"];
    const userId = req.params.userId;
    usersDao
      .addBlockedUser(userId, currentAdmin)
      .then((actualUser) => console.log(actualUser));
    usersDao.blockUser(userId).then((actualUser) => res.json(actualUser));
  };

  const unblockUser = (req, res) => {
    const currentAdmin = req.session["currentUser"];
    const userId = req.params.userId;
    usersDao
      .deleteBlockedUser(userId, currentAdmin)
      .then((actualUser) => console.log(actualUser));
    usersDao.unblockUser(userId).then((actualUser) => res.json(actualUser));
  };

  const editUser = (req, res) => {
    const user = req.body;
    console.log(user);
    usersDao.editUser(user).then((actualUser) => {
      console.log(actualUser);
      if (req.session["currentUser"]._id == actualUser._id) {
        console.log("editing current user");
        req.session.regenerate(() => {
          req.session["currentUser"] = actualUser;
          res.json(actualUser);
        });
      } else {
        res.json(actualUser);
      }
    });
  };

  app.post("/api/login", login);
  app.post("/api/register", register);
  app.get("/api/currentUser", currentUser);
  app.get("/api/users/:username", getUser);
  app.post("/api/logout", logout);
  //todo these addresses aren't REST standard
  app.put("/api/users/block/:userId", blockUser);
  app.put("/api/users/unblock/:userId", unblockUser);
  app.put("/api/users", editUser);
};
