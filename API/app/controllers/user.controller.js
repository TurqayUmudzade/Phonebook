const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  let out = {
    user_id: undefined,
    operation_type: "add",
    operation_status: "success"
  }
  const { name, phone } = req.body
  // Validate request

  if (!name || !phone) {
    console.log(name, phone);
    out.operation_status = "fail"
    res.status(400).send(out);
    return;
  }


  const user = {
    name: req.body.name,
    phone: req.body.phone,
  };

  User.create(user)
    .then(data => {
      out.user_id = data.id
      res.send(out);
    })
    .catch(err => {
      out.operation_status = "fail1"
      out.error = err
      res.send(out);
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;


  let out = {
    user_id: id,
    operation_type: "edit",
    operation_status: "success"
  }

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send(out);
      } else {
        out.operation_status = "fail"
        res.send(out);
      }
    })
    .catch(err => {
      out.operation_status = "fail"
      res.send(out);
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;


  let out = {
    user_id: id,
    operation_type: "delete",
    operation_status: "success"
  }


  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send(out);
      } else {
        out.operation_status = "fail"
        res.send(out);
      }
    })
    .catch(err => {
      out.operation_status = "fail"
      res.send(out);
    });
};
