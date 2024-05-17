const { response } = require('express');

const Hospital = require('../models/hospital.model');





const getHospitals = async(req, res = response) => {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name')
    res.status(200).json({
        ok: true,
        hospitals
    });

}


const postHospital = async(req, res = response) => {

    const id = req.id;

    const hospital = new Hospital( {
        user: id,
        ...req.body //por el req.body viene todos los campos necesario
    }); 

    try {

       const hospitalDB =  await hospital.save();
        
        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'unexpected error to create hospital'
        });
    }


}

const putHospital = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'putHospital'
    });

}

const deleteHospital = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'deleteHospitals'
    });

}

module.exports = {
    getHospitals,
    postHospital,
    putHospital,
    deleteHospital
}