//importacion del paquete
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION , {
            useNewUrlParser: true,
            useUnifiedTopology: true,         
        });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error to connect');
    }

}

module.exports = {
    dbConnection
}