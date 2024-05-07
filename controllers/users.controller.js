const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateTokenJwt } = require('../helpers/jwt');
const User = require('../models/user.model');

const getUsers = async (request, response) => {

    const users = await User.find({}, 'name password email role google');
    
    response.json({
        ok: true,
        users
    });
}

const postUsers = async(request, resp = response) => {

    const { password, email } = request.body;

    try {
        const userDB = await User.findOne({ email });
      
        if (userDB) {
            return resp.status(400).json({
                ok: false,
                msg: 'The email exist'
            });
        }

        const user = new User(request.body);

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);


        await user.save();
        
        //Generar token. JASON WEB TOKEN
         const token = await generateTokenJwt(user.uid);
        

        resp.status(200).json({
            ok: true,
            user, 
            token 
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }  
}

const putUsers = async(request, resp = response) => {
    
    //TODO: Validar token y comprobar si es el usuario correcto
    
    const uid = request.params.id;
    
    try {

        const dbUser = await User.findById(uid);

        if (!dbUser) {
            return resp.status(404).json({
                ok:false,
                msg: 'User not found'
            });
        }

        //Actualizaciones

        // const fields = request.body;
        const { password, google, email, ...fields } = request.body; //REFACTOR DE LO DE ARRIBA

        if(!dbUser.email !== email){
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return resp.status(400).json({
                    msg: 'The email exist'
                });
            }
        }

        fields.email = email;
        const updateUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        resp.json({
            ok:true,
            user: updateUser
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
    
}

const deleteUsers = async(request, resp = response) => {

    const uid = request.params.id;

    try {

        const dbUser = await User.findById(uid);

        if (!dbUser) {
            return resp.status(404).json({
                ok:false,
                msg: 'User not found'
            });
        }
        
        await User.findByIdAndDelete(uid);

        resp.status(200).json({
            ok:true,
            msg: 'User deleted'
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}



module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}