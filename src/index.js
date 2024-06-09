const express = require('express');
const morgan = require('morgan');
const rutas = require('./routes/index.js');
const config = require('./config');


const app = express();

app.use(express.json());
app.set('port', config.app.port);
app.use(morgan('dev'));
app.use(rutas);

app.listen(config.app.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.app.port}`);
});     