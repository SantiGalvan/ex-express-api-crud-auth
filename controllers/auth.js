// Importo e inizializzo prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword } = require("../utils/password.js");
const generateToken = require("../utils/generateToken.js");

const register = async (req, res) => {
    try {
        // Recupero i valori
        const { email, name, password } = req.body;

        const data = {
            email,
            name,
            password: await hashPassword(password),
        }

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { register }