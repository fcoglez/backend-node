//el módulo fs es esencial para trabajar con el sistema de archivos en aplicaciones Node.js, 
//permitiendo realizar operaciones de lectura, escritura, creación, eliminación, y 
//manipulación de archivos y directorios.
const fs = require('fs');

const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');




const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path); //borra la imagen
    }
}


const updateImage = async(type, id, fileName) => {

    let oldPath;

    switch (type) {
        case 'users':
            const user = await User.findById(id);

            if (!user) {
                return false;
            }

            oldPath = `./uploads/users/${user.img}`;
            deleteImage(oldPath);

            user.img = fileName;
           
            await user.save();
            return true; 
        break;

        case 'doctors':
            const doctor = await Doctor.findById(id);

            if (!doctor) {
                return false;
            }

            oldPath = `./uploads/doctors/${doctor.img}`;
            deleteImage(oldPath);

            doctor.img = fileName;
           
            await doctor.save();
            return true;
        break; 

        case 'hospitals':
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                return false;
            }

            oldPath = `./uploads/hospitals/${hospital.img}`;
            deleteImage(oldPath);

            hospital.img = fileName;
           
            await hospital.save();
            return true;
        break; 
     }


    
}






module.exports = {
    updateImage   
}