const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const validator = require('../middlewares/validator.js');
const { registerBody } = require("../validations/users.js");

// Registrazione
router.post('/register', validator(registerBody), authController.register);

module.exports = router;