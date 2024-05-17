const jwt = require('jsonwebtoken');



const validateJWT = (req, res, next) => {

    //leer el token

    const token = req.header('x-token');
    
    if (!token) {
       return res.status(401).json({
        ok: false,
        msg: 'no token in the app'
       });
    }

    try {

        const { id } = jwt.verify( token, process.env.JWT_SECRET);

        req.id = id;

        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token invalid'
           });
    }
    
    
    
    
    
    
}

module.exports = {
    validateJWT
}