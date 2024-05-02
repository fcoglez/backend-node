const { response } = require('express');

const User = require('../models/user.model');

const getUsers = async (request, response) => {

    const users = await User.find({}, 'name password email role google');
    
    response.json({
        ok: true,
        users
    });
}

const postUsers = async(request, resp = response) => {

    const { name, password, email } = request.body;

    try {
        const existingEmail = await User.findOne({ email });
        
        if (existingEmail) {
            return resp.status(400).json({
                msg: 'The email exist'
            });
        }

        const user = new User(request.body);

        await user.save();

        resp.json({
            ok: true,
            user
        });
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }  
}



module.exports = {
    getUsers,
    postUsers,
}