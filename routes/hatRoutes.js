const express = require('express');
const { registerHat, editHat, deleteHat, getHats } = require('../controllers/hatController');

const router = express.Router();

router.post('/register', registerHat); 
router.patch('/edit/:id_gorra', editHat);
router.delete('/delete/:id_gorra', deleteHat);
router.get('/get/:id_usuario', getHats);

module.exports = router;

