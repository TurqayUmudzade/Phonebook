var express = require('express');
var router = express.Router();
const db = require('../helpers/queries')
/* GET users listing. */
router.get('/list', function (req, res, next) {
  db.getUsers(req, res)
});

router.get('/:id', function (req, res, next) {
  db.getUserById(req, res)
});

router.post('/add', function (req, res, next) {
  db.createUser(req, res)
});

router.put('/edit/:id', function (req, res, next) {
  db.updateUser(req, res)
});

router.delete('/edit/:id', function (req, res, next) {
  db.deleteUser(req, res)
});

module.exports = router;
