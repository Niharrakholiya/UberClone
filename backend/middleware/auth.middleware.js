const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res,next) => {
    let token;
    if(req.header.authorization){
    const token = req.header.authorization.split(' ')[1];
    }
    else{
        const token = req.cookies.token;
    }
    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await BlacklistToken.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log(decoded);
        const user = await UserModel.findById(decoded._id);
        console.log(user);
        req.user = user;
        return next();
    }
    catch (error) {
        console.log('Invalid token');
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res,next) => {
    let token;
    if(req.header.authorization){
        token = req.header.authorization.split(' ')[1];
    }
    else{
        token = req.cookies.token;
    }
    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await BlacklistToken.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log(decoded);
        const captain = await captainModel.findById(decoded._id);
        console.log(captain);
        req.captain = captain;
        return next();
    }
    catch (error) {
        console.log('Invalid token');
        return res.status(401).json({ message: 'Unauthorized' });
    }
}