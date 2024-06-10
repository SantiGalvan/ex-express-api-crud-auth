const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tags.js");
const validator = require('../middlewares/validator.js');
const { validationTagId, bodyData } = require("../validations/generalValidation.js");
const validationToken = require("../middlewares/auth.js");

// Store con validatori (token e dati ricevuti)
router.post('/', [validationToken, validator(bodyData)], tagsController.store);
// Index
router.get('/', tagsController.index);
// Validatore dell'id
router.use('/:id', validator(validationTagId));
// Show
router.get('/:id', tagsController.show);
// Update con validatori (token e dati ricevuti)
router.put('/:id', [validationToken, validator(bodyData)], tagsController.update);
// Delete con validatore del token
router.delete('/:id', validationToken, tagsController.destroy);

module.exports = router;