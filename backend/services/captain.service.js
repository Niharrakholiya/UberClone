const captainModel = require('../models/captain.model');
module.exports.createCaptain = async ({ firstname, lastname, email, password,color,plate,capacity,vehicleType }) => {
    if (!email || !password || !firstname || !color || !plate || !capacity || !vehicleType) {
        throw new Error('Please provide all fields');
    }
    const captain = await captainModel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}