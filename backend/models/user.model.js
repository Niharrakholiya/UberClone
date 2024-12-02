const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required:false,
            minlength:[3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.ComparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;