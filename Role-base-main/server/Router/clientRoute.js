const express = require('express');
const { createclient, loginclient, getClients,  } = require('../Controller/clientController');
const auth = require('../Middleware/auth')

const router = express.Router()

router.post('/create',auth,createclient);
router.get('/',auth,getClients)
router.post('/loginclient',loginclient);



module.exports = router;