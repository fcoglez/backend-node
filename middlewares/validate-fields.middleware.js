const { response } = require('express');
const { validationResult } = require('express-validator');


const validateFields = (req, resp = response, next) => {

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            allErrors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    validateFields
}