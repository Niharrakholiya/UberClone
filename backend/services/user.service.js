const userModel = require('../models/user.model');

module.exports.createUser = async ({firstname, lastname, email, password}) => {
        if(!email || !password || !firstname ){
            throw new Error('Please provide all fields');
        }
        const user = await userModel.create({
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email,
            password
        });
        return user;
}
