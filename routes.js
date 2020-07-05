const express = require('express');
const router = express.Router();

const contactUsController = require('./controllers/contactUsController');


router.get('/', contactUsController.contact_us_get)
router.post('/', contactUsController.contact_us_post)
router.get('/:id', contactUsController.contact_us_get_by_id)

module.exports = router;