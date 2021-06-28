const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/aspirant')

router.route('/register_aspirant').post(register);

router.route('/login_aspirant').post(login);

module.exports = router;