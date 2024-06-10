// Importo bcrypt
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const hashPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, process.env.PEPPER_KEY, 10);
    return hashPassword;
}

module.exports = { hashPassword }