const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
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
        lowercase: true,
        match:[/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength:[3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            minlength:[3, 'Plate must be at least 3 characters long'],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        } ,
        location:{
            lat: {
                type: Number,
            },
            long: {
                type: Number,
            }
        }
    },

});
captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
captainSchema.methods.ComparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}
const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;