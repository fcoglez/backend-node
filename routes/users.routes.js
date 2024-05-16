/*
    Ruta: /api/users
*/ 
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.middleware');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users.controller');
const { validateJWT } = require('../middlewares/validate-jwt.middelware');

const router = Router();

//GET
router.get('/', validateJWT, getUsers );


//POST
router.post('/', 
    [
        check('name', 'the name is obligatory').not().isEmpty(),
        check('email', 'the email is obligatory').isEmail(),
        check('password', 'the password is obligatory').not().isEmpty(),
        validateFields,
    ],
    postUsers
);


//PUT
router.put('/:id',
    [
        validateJWT,
        check('name', 'the name is obligatory').not().isEmpty(),
        check('email', 'the email is obligatory').isEmail(),
        check('role', 'the role is obligatory').not().isEmpty(),
        validateFields,
    ],
    putUsers 
);


//DELETE
router.delete('/:id',
   validateJWT,
   deleteUsers 
);



module.exports = router;
