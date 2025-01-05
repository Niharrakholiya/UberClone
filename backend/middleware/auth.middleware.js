const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res,next) => {
    const token = req.cookies.token || req.header.authorization.split(' ')[1];
    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log(decoded);
        console.log("Upper user");
        const user = await UserModel.findById(decoded._id);
        console.log("Lower user");
        console.log(user);
        req.user = user;
        console.log('User authenticated');
        return next();
    }
    catch (error) {
        console.log('Invalid token');
        return res.status(401).json({ message: 'Unauthorized' });
    }
}