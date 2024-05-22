const { response } = require('express');


const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');



const getAll = async (req, res = response) => {

    const nameParam = req.params.search;
    const regex = new RegExp(nameParam, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User.find({name: regex}),
        Hospital.find({name: regex}),
        Doctor.find({name: regex})
    ]);

    res.json({
        ok: true,
        users,
        hospitals,
        doctors
    });
}

const getCollectionDocuments = async (req, res = response) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    let data = [];

    switch (table) {
        case 'doctors':
            data = await Doctor.find({name: regex});
        break;

        case 'hospitals':
            data = await Hospital.find({name: regex});  
        break;

        case 'users':
            data =await User.find({name: regex});
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'The table is users, doctors or hospitals'
            });  
    }

    res.json({
        ok: true,
        data
    });
}

module.exports = {
    getAll,
    getCollectionDocuments
}