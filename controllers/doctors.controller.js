const { response } = require('express');

const Doctor = require('../models/doctor.model.js');


const getDoctors = async(req, res = response) => {
        
    const doctors = await Doctor.find()
                                     .populate('user', 'name img');
                                    //  .populate('Hospital', 'name img');
    
    res.status(200).json({
        ok: true,
        doctors
    });


}


const postDoctor = async(req, res = response) => {

    const id = req.id;

    const doctor = new Doctor( {
        user: id,
        ...req.body //por el req.body viene todos los campos necesario
    }); 

    try {
        const doctorDB =  await doctor.save();

        res.status(200).json({
            ok: true,
            doctor: doctorDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'unexpected error to create a doctor'
        });
    }

}

const putDoctor = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'putDoctor'
    });

}

const deleteDoctor = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'deleteDoctor'
    });

}

module.exports = {
    getDoctors,
    postDoctor,
    putDoctor,
    deleteDoctor
}
