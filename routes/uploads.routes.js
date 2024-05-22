/*
    Ruta: /api/uploads/
*/ 
const { Router } = require('express');
const fileUpload = require('express-fileupload');


const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const { fileUpload: fileUploadController } = require('../controllers/uploads.controller');


const router = Router();

router.use(fileUpload());

router.put('/:type/:id', validateJWT, fileUploadController);




module.exports = router;