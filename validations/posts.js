const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
    title: {
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
    content: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'il contenuto è obbligatorio',
            bail: true
        },
        isString: {
            errorMessage: 'Il contenuto non può contenere solo da numeri',
            bail: true
        },
        isLength: {
            errorMessage: 'Il contenuto deve contenere almeno 20 caratteri',
            options: { min: 20 }
        }
    },
    categoryId: {
        in: ["body"],
        isInt: {
            errorMessage: 'Category id deve essere un numero',
            bail: true
        }, custom: {
            options: async (value) => {
                const categoryId = parseInt(value);
                const category = await prisma.category.findUnique({
                    where: { id: categoryId }
                });

                if (!category) throw new Error(`Non esiste una Category con id ${categoryId}`);

                return true;
            }
        }
    },
    tags: {
        in: ["body"],
        isArray: {
            errorMessage: 'I tags devono essere passati come array',
            bail: true
        },
        custom: {
            options: async (array) => {
                // Controllo che gli id dei tag ricevuti siano numeri
                const typeId = array.find(id => isNaN(parseInt(id)));
                if (typeId) throw new Error('Uno o più id non sono numeri');

                const intTags = array.map(id => parseInt(id));

                //? Controllo se gli id dei tag ricevuti esistano
                // Recupero tutti i tags
                const tags = await prisma.tag.findMany();
                // Recupero solo gli id dei tags
                const tagIds = tags.map(tag => tag.id);
                // Recupero dall'array ricevuto gli id a cui corridspondono
                const ids = tagIds.filter(id => intTags.includes(id));
                if (ids.length !== intTags.length) {
                    const idNotExists = intTags.filter(i => !ids.includes(i));
                    throw new Error(`Gli id:${idNotExists} non sono degli id dei tags`);
                }

                return true;
            }
        }
    },
    published: {
        in: ["body"],
        isBoolean: {
            errorMessage: 'Published può essere solo vero o falso'
        }
    }
}

module.exports = bodyData;