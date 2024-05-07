const jwt = require('jsonwebtoken');

const generateTokenJwt = ( id ) => {

    return new Promise( (resolve, reject) => {
        
        const payload = {
            id
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Cannot generate token');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateTokenJwt
}
   