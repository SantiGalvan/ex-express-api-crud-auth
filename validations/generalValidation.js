const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validationSlug = {
    slug: {
        in: ["params"],
        custom: {
            options: async (value) => {
                const slug = await prisma.post.findUnique({ where: { slug: value } });

                if (!slug) throw new Error(`Non esiste un post con slug: ${value}`);

                return true;
            }

        }
    }
}

const validationCategoryId = {
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "Id deve essere un numero intero"
        },
        custom: {
            options: async (value) => {
                const id = await prisma.category.findUnique({ where: { id: parseInt(value) } });

                if (!id) throw new Error(`Non esiste una categoria con id:${value}`);

                return true;
            }

        }
    }
}

const validationTagId = {
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "Id deve essere un numero intero"
        },
        custom: {
            options: async (value) => {
                const id = await prisma.tag.findUnique({ where: { id: parseInt(value) } });

                if (!id) throw new Error(`Non esiste un tag con id:${value}`);

                return true;
            }

        }
    }
}

const bodyData = {
    label: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'il titolo è obbligatorio',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo non può contenere solo da numeri',
            bail: true
        },
        isLength: {
            errorMessage: 'Il titolo deve contenere almeno 5 caratteri',
            options: { min: 5 }
        }
    },
}

module.exports = { validationSlug, validationCategoryId, validationTagId, bodyData };