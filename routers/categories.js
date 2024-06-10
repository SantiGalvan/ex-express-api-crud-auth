const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.js");
const validator = require('../middlewares/validator.js');
const { validationCategoryId, bodyData } = require("../validations/generalValidation.js");
const validationToken = require("../middlewares/auth.js");

// Store con validatori (token e dati ricevuti)
router.post('/', [validationToken, validator(bodyData)], categoriesController.store);
// Index
router.get('/', categoriesController.index);
// Validatore dell'id
router.use('/:id', validator(validationCategoryId));
// Show
router.get('/:id', categoriesController.show);
// Update con validatori (token e dati ricevuti)
router.put('/:id', [validationToken, validator(bodyData)], categoriesController.update);
// Delete con validatore del token
router.delete('/:id', validationToken, categoriesController.destroy);

module.exports = router;