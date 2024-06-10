const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

const store = async (req, res) => {
    const { title, content, categoryId, tags } = req.body;

    const slug = slugify(title);

    const data = {
        title,
        slug,
        image: req.body.image ? req.body.image : '',
        content,
        published: req.body.published ? true : false,
        categoryId: categoryId ? categoryId : '',
        tags: {
            connect: tags.map(id => ({ id }))
        }
    }

    try {
        const post = await prisma.post.create({
            data, include: {
                tags: {
                    select: {
                        label: true
                    }
                }
            }
        });
        res.status(200).send(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const index = async (req, res) => {
    try {
        const where = {};
        const { published, text, page = 1, limit = 5 } = req.query;

        // Paginazione
        const offset = (page - 1) * limit;
        const totalItems = await prisma.post.count({ where });
        const totalPages = Math.ceil(totalItems / limit);

        if (page > totalPages) throw new Error(`La pagina ${page} non esiste`);

        // Filtri
        if (text) {
            where.OR = [
                { content: { contains: text } },
                { title: { contains: text } }
            ]
        }

        if (published === 'true') {
            where.published = true;
        } else if (published === 'false') {
            where.published = false;
        }

        const posts = await prisma.post.findMany({
            where,
            take: parseInt(limit),
            skip: parseInt(offset),
            include: {
                category: {
                    select: {
                        id: true
                    }
                },
                tags: {
                    select: {
                        id: true
                    }
                }
            }
        });
        res.json({
            data: posts,
            page,
            totalPages
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: {
                    select: {
                        label: true
                    }
                },
                tags: {
                    select: {
                        label: true
                    }
                }
            }
        });

        res.json(post);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const update = async (req, res) => {
    try {
        const { slug } = req.params;

        const { title, content, categoryId, tags } = req.body;

        const newSlug = slugify(title);

        const data = {
            title,
            slug: newSlug,
            image: req.body.image ? req.body.image : '',
            content,
            published: req.body.published ? true : false,
            categoryId: categoryId ? categoryId : '',
            tags: {
                connect: tags.map(id => ({ id }))
            }
        }

        const post = await prisma.post.update({
            where: { slug },
            data
        });

        res.json(post);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const destroy = async (req, res) => {
    try {

        const { slug } = req.params;
        const post = await prisma.post.delete({ where: { slug } });

        res.json(`Post ${post.title} con slug:${slug} eliminato con successo`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

}

module.exports = { store, index, show, update, destroy }