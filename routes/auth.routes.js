/*
    Ruta: /api/login
*/ 

const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields.middleware');



const router = Router();


//POST
router.post('/', 
    [
        check('email', 'the email is obligatory').isEmail(),
        check('password', 'the password is obligatory').not().isEmpty(),
        validateFields,
    ],
    login
);

router.post('/google', 
    [
        check('token', 'the token of google is obligatory').not().isEmpty(),
        validateFields,
    ],
    googleSingIn
);







module.exports = router;