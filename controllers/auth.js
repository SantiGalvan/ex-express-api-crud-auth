// Importo e inizializzo prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require("../utils/password.js");
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

const login = async (req, res) => {
    try {
        // Recupero gli elementi
        const { email, password } = req.body;

        const error = new Error('Email o password errati');

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw error;

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw error;

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

module.exports = { register, login }