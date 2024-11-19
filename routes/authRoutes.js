const express = require('express');
const { register, login, editUser, deleteUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/edit/:id_usuario', editUser);  
router.delete('/delete/:id_usuario', deleteUser); 

module.exports = router;

