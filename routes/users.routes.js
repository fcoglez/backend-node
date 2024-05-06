/*
    Ruta: /api/users
*/ 
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.middleware');
const { getUsers, postUsers, putUsers } = require('../controllers/users.controller');

const router = Router();

//GET
router.get('/', getUsers );


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
        check('name', 'the name is obligatory').not().isEmpty(),
        check('email', 'the email is obligatory').isEmail(),
        // check('role', 'the role is obligatory').isEmail(),
    ],
    putUsers 
);




module.exports = router;
