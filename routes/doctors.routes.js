/*
    Hospitals
    ruta: /api/doctors
*/ 


const { Router } = require('express');
const { check } = require('express-validator');

const { getDoctors, postDoctor, putDoctor, deleteDoctor} = require('../controllers/doctors.controller');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');



const router = Router();

//GET
router.get('/', getDoctors );


//POST
router.post('/', 
    [
        validateJWT,
        check('name', 'the name is obligatory').not().isEmpty(),
        check('hospital', 'the hospital id is obligatory').isMongoId(),
        validateFields
    ],
    postDoctor
);


//PUT
router.put('/:id',
    [
        
    ],
    putDoctor 
);


//DELETE
router.delete('/:id',
    deleteDoctor 
);



module.exports = router;
