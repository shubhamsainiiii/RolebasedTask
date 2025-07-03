const express = require('express');
const { createadmin, login } = require('../Controller/superadmin');

const router = express.Router()

router.post('/create',createadmin);
router.post('/loginadmin',login);



module.exports = router;