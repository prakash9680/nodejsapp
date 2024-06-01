const express = require('express');
const router = express.Router();
const {UserRegisterValidation, UserLoginValidation} = require('./../middlewares/validation');
const { register, login } = require('./../controllers/AuthController');

/* GET home page. */
router.post('/login', UserLoginValidation(), login);
router.post('/register',UserRegisterValidation(), register);

module.exports = router;