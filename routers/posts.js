const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.js");
const validator = require('../middlewares/validator.js');
const { validationSlug } = require("../validations/generalValidation.js");
const bodyData = require("../validations/posts.js");
const validationToken = require("../middlewares/auth.js");

// Store con validatori (token e dati ricevuti)
router.post('/', [validationToken, validator(bodyData)], postsController.store);
// Index
router.get('/', postsController.index);
// Validatore dello slug
router.use('/:slug', validator(validationSlug));
// Show
router.get('/:slug', postsController.show);
// Update con validatori (token e dati ricevuti)
router.put('/:slug', [validationToken, validator(bodyData)], postsController.update);
// Delete con validatore del token
router.delete('/:slug', validationToken, postsController.destroy);

module.exports = router;