const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authCheck')

/* GET all users listing. */
// ADMIN only
router.get('/', isLoggedIn, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
