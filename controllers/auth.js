// Importo e inizializzo prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword } = require("../utils/password.js");
const token = require("../utils/generateToken.js");

const register = async (req, res) => {
    try {// Recupero i valori
        const { name, email, password } = req.body;

        const data = {
            name,
            email,
            password: await hashPassword(password),
        }

        const user = await prisma.user.create({ data });

        const token = token({
            email: user.email,
            name: user.name
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { register }