const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
    const { label } = req.body;

    const data = { label };

    try {

        const tag = await prisma.tag.create({ data });
        res.status(200).send(tag);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const index = async (req, res) => {
    try {

        const tags = await prisma.tag.findMany();
        res.json(tags);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => {
    try {

        const { id } = req.params;

        const tag = await prisma.tag.findUnique({ where: { id: parseInt(id) } });
        res.json(tag);

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

        const tag = await prisma.tag.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(tag);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const destroy = async (req, res) => {
    try {

        const { id } = req.params;

        const tag = await prisma.tag.delete({ where: { id: parseInt(id) } })
        res.json(`Tag ${tag.label} con id:${id} eliminato con successo`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { store, index, show, update, destroy }