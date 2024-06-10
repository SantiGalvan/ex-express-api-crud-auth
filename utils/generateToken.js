const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const token = (payload, expiresIn = '8h') => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

module.exports = token;