/*
    Hospitals
    ruta: /api/hospitals
*/ 


const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitals, postHospital, putHospital, deleteHospital} = require('../controllers/hospitals.controllers');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');



const router = Router();

//GET
router.get('/', getHospitals );


//POST
router.post('/', 
    [
        validateJWT,
        check('name', 'the name is obligatory').not().isEmpty(),
        validateFields
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
   deleteHospital
);



module.exports = router;
