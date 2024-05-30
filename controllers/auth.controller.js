const { response } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user.model');
const { generateTokenJwt } = require('../helpers/jwt');




const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });
        
        //Verificar email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not valid'
            });
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, userDB.password); //Si hace match es true si no false

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password not valid'
            });
        }

        //Generar token. JASON WEB TOKEN
        const token = await generateTokenJwt(userDB.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to make login'
        });
    }
}

const googleSingIn = async (req, res = response) => {
    
    res.json({
        ok: true,
        msg: req.body.token
    });
}

module.exports = {
    login, 
    googleSingIn
}