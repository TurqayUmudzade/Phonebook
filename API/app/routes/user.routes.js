module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/add", users.create);

  router.get("/list", users.findAll);

  router.put("/edit/:id", users.update);

  router.delete("/delete/:id", users.delete);

  app.use('/user', router);
};
