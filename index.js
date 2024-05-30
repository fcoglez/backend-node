//ASI SE HACE UNA IMPORTACION EN NODE
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//CREAR EL SERVIDOR DE EXPRESS
const app = express();





//CONFIGURAR CORS
app.use(cors());

//Carpeta Public
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());







//Llamada la base de datos
dbConnection();


//Routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/all', require('./routes/searches.routes'));
app.use('/api/hospitals', require('./routes/hospitals.routes'));
app.use('/api/doctors', require('./routes/doctors.routes'));


app.use('/api/login', require('./routes/auth.routes'));


app.use('/api/uploads', require('./routes/uploads.routes'));







app.listen( 3000, () => {
    console.log('Server listening on port ' + 3000);
})