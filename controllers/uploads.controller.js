const { response } = require('express');



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

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        }); 
    }




    res.json({
        ok:true
    });

}


module.exports = {
    fileUpload
}