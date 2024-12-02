const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
], (req, res) => {
    // Handle the request
   userController.registerUser(req,res);
});
module.exports = router;