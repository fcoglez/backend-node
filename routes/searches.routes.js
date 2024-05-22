/*
    Ruta: /api/all
*/ 


const { Router } = require('express');
const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const { getAll, getCollectionDocuments } = require('../controllers/searches.controller');


const router = Router();




router.get('/:search', validateJWT, getAll);
router.get('/collection/:table/:search', validateJWT, getCollectionDocuments);








module.exports = router;