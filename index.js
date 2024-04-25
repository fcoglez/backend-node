//ASI SE HACE UNA IMPORTACION EN NODE
const express = require('express');

//CREAR EL SERVIDOR DE EXPRESS
const app = express();


//Routes
app.get('/', (request, response) => {
    response.json({
        ok: true,
        msg: 'Hello Faku',
        test: 45
    });
});



app.listen( 3000, () => {
    console.log('Server listening on port ' + 3000);
});