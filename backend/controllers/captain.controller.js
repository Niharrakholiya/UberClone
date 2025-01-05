const captainModel = require("../models/captain.model")
const CaptainService = require("../services/captain.service")
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');
module.exports.registerCaptain = async (req, res) => {
    try {
        const {fullname, email, password, vehicle} = req.body;
        const isCaptainExist = await captainModel.findOne({ email}); 
        if (isCaptainExist) {
            return res.status(400).json({ message: 'Captain already exists' });
        }
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await CaptainService.createCaptain(
            {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
                email,
                password: hashedPassword,
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType,
            }
        );
        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports.loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await captain.ComparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ token, captain });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res,next) => {
        res.status(200).json(req.captain);
    
}

module.exports.logoutcaptain = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });

    res.status(200).json({message: 'Logged out successfully'});
}