/*
    Hospitals
    ruta: /api/hospitals
*/ 


const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitals, postHospital, putHospital, deleteHospitals} = require('../controllers/hospitals.controllers');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middelware');



const router = Router();

//GET
router.get('/', getHospitals );


//POST
router.post('/', 
    [
    ],
    postHospital
);


//PUT
router.put('/:id',
    [
        
    ],
    putHospital 
);


//DELETE
router.delete('/:id',
   deleteHospitals 
);



module.exports = router;
