const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
    const { label } = req.body;

    const data = { label };

    try {

        const category = await prisma.category.create({ data });
        res.status(200).send(category);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const index = async (req, res) => {
    try {

        const categories = await prisma.category.findMany();
        res.json(categories);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
        res.json(category);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const update = async (req, res) => {
    try {

        const { id } = req.params;

        const { label } = req.body;
        const data = { label };

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(category);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const destroy = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await prisma.category.delete({ where: { id: parseInt(id) } })
        res.json(`Categoria ${category.label} con id:${id} eliminato con successo`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { store, index, show, update, destroy }