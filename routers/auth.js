const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const validator = require("../middlewares/validator.js");
const { registerBody, loginBody } = require("../validations/users.js");

// Registrazione
router.post('/register', validator(registerBody), authController.register);
// Login
router.post('/login', validator(loginBody), authController.login);
// Index
router.get('/users', authController.index);

module.exports = router;