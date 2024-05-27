const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/updateImage');




const fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['users', 'doctors', 'hospitals'];
    if ( !validTypes.includes(type) ) {
        return res.status().json({
            ok:false,
            msg: 'Not is a user, doctor or hospital'
        });
    }

    //Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        }); 
    }

    //Procesar la imagen
    const file = req.files.image;
    
    const nameSplit = file.name.split('.');
    const extensionImage = nameSplit[nameSplit.length - 1] ;

    //Validar extensiones
    const extensionValidate = ['png', 'jpeg', 'jpg', 'gif'];
    if (!extensionValidate.includes(extensionImage)) {
        return res.status(400).json({
            ok: false,
            msg: 'The extension not validate'
        }); u
    }

    //Generar el nombre del archivo
    const fileName = `${ uuidv4()}.${ extensionImage }`;
    
    //Path para guardar la imagen
    const path = `./uploads/${type}/${fileName}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error to move the image'
            }); 
        }

        //Actualizar base de datos
        updateImage(type, id, fileName);
      
        res.json({
            ok:true,
            msg: 'Uploaded file',
            fileName
        });
    });
}


module.exports = {
    fileUpload
}