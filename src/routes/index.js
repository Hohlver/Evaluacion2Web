const {Router} = require('express');
const productoRuta = require('./productos.routes');
const proveedorRuta = require('./proveedor.routes')
const vendedorRuta = require('./vendedor.routes')
const ventasRuta = require('./ventas.routes')
const rutas = Router();
rutas.use('/productos', productoRuta);
rutas.use('/proveedor', proveedorRuta);
rutas.use('/vendedor', vendedorRuta);
rutas.use('/ventas', ventasRuta);

rutas.get('/', (req, res) => {
    res.send('Pagina Principal');
});

rutas.get('/about', (req, res) => {
    res.send('SECUNDARIO');
});

module.exports = rutas;