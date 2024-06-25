const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.js");
const validator = require('../middlewares/validator.js');
const { validationSlug } = require("../validations/generalValidation.js");
const bodyData = require("../validations/posts.js");
const validationToken = require("../middlewares/auth.js");
const verifyOwnership = require("../middlewares/authUser.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "public/post_images",
    filename: (req, file, cf) => {
        const fileType = path.extname(file.originalname);
        cf(null, String(Date.now()) + fileType);
    }
})

const upload = multer({ storage });

// Store con validatori (token e dati ricevuti) e upload dell'immagine
router.post('/', [validationToken, upload.single("image"), validator(bodyData)], postsController.store);
// Index
router.get('/', postsController.index);
// Validatore dello slug
router.use('/:slug', validator(validationSlug));
// Show
router.get('/:slug', postsController.show);
// Update con validatori (token e dati ricevuti)
router.put('/:slug', [validationToken, verifyOwnership, upload.single("image"), validator(bodyData)], postsController.update);
// Delete con validatore del token
router.delete('/:slug', [validationToken, verifyOwnership], postsController.destroy);

module.exports = router;