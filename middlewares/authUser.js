const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyOwnership = async (req, res, next) => {

    // Recupero lo slug del post
    const postSlug = req.params.slug;

    // Tramite il token recupero l'id dello user
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    const userId = user.id;

    try {
        // Recupero l'intero post
        const post = await prisma.post.findUnique({ where: { slug: postSlug } });

        if (post.userId !== userId) {
            res.status(403).send('Non sei autorizzato');
        } else {
            next();
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

}

module.exports = verifyOwnership;