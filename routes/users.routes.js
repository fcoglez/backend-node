/*
    Ruta: /api/users
*/ 
const { Router } = require('express');
const { getUsers, postUsers } = require('../controllers/users.controller');

const router = Router();


router.get('/', getUsers );



router.post('/', postUsers);




module.exports = router;