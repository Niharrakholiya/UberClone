const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware  = require('../middleware/auth.middleware');
router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Please provide a valid vehicle type'),
    body('vehicle.location.lat').isNumeric().withMessage('Please provide a valid latitude'),
    body('vehicle.location.long').isNumeric().withMessage('Please provide a valid longitude'),
], (req, res) => {
    // Handle the request
    console.log(req.body);
   captainController.registerCaptain(req,res);
});

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],(req,res)=>{
    // Handle the request
    captainController.loginCaptain(req,res);
});

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutcaptain)

module.exports = router;