//ASI SE HACE UNA IMPORTACION EN NODE
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//CREAR EL SERVIDOR DE EXPRESS
const app = express();





//CONFIGURAR CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());







//Llamada la base de datos
dbConnection();


//Routes
app.use('/api/users', require('./routes/users.routes'));







app.listen( 3000, () => {
    console.log('Server listening on port ' + 3000);
});