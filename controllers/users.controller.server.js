const usersDao = require("../daos/users.dao.server");
module.exports = (app) => {
  const register = (req, res) => {
    const adminKey = "hello2020placeholder";
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
                res.status(400).send({ message: "User name already exists" });
              }
            })
        )
          usersDao.createUser(newUser).then((actualUser) => {
            req.session["currentUser"] = actualUser;
            res.json(actualUser);
          });
        return;
      } else {
        res.status(400).send({
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
            res.status(400).send({ message: "User name already exists" });
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
      console.log('got user', user, ' from db for username', username)
      if (user) {
        req.session["currentUser"] = user;
        console.log(req.sessionID);
        res.send(user);
      } else {
        res.sendStatus(403);
      }
    });
  };

  const currentUser = (req, res) => {
    console.log(req.sessionID);
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
    res.send(200);
  };

  const blockUser = (req, res) => {
    const username = req.params.username;
    usersDao.blockUser(username)
        .then((actualUser) => res.json(actualUser))
  }

  app.post("/api/login", login);
  app.post("/api/register", register);
  app.get("/api/currentUser", currentUser);
  app.get("/api/users/:username", getUser);
  app.post("/api/logout", logout);
  app.put("/api/users/:username", blockUser)
};
