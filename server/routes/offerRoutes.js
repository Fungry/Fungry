const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/authCheck')

// load the models
const db = require('../models')



module.exports = router;