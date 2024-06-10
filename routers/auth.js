const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

// Registrazione
router.post('/register', authController.register);

module.exports = router;