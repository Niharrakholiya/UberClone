const userModel = require('../models/user.model');
const userServices = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   const {fullname, email, password} = req.body;
   hasedPassword = await userModel.hashPassword(password);
   const user = await userServices.createUser({firstname:fullname.firstname, lastname:fullname.lastname, email, password: hasedPassword});
   const token = user.generateAuthToken();
    res.status(201).json({token,user});
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password'); // when you find user it finds the password as well by default it is set to false
    if(!user){
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const isMatch = await user.ComparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token,user});
}

module.exports.getUserProfile = async (req, res,next) => {
    res.status(200).json(req.user);
}   

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header.authorization.split(' ')[1];
    const isBlacklisted = await BlacklistToken.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }
    res.status(200).json({message: 'Logged out successfully'});
}