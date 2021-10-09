var express = require('express');
var router = express.Router();
const user = require('./controller')

router.post("/register", user.createUser);
router.post("/login", user.loginUser);

module.exports = router ;