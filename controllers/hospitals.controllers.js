const { response } = require('express');





const getHospitals = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'getHospitals'
    });

}


const postHospital = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'postHospital'
    });

}

const putHospital = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'putHospital'
    });

}

const deleteHospitals = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'deleteHospitals'
    });

}

module.exports = {
    getHospitals,
    postHospital,
    putHospital,
    deleteHospitals
}