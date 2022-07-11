const express = require('express');
const router = express.Router();
const {createUser, checkUsername, registerUser} = require('../controllers/usersController');

router.post('/', registerUser);

router.get('/', loginUser);


module.exports = router;