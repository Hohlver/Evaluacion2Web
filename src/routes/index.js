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
    const titulo = "home"
    res.render('home', {titulo});
});

rutas.get('/about', (req, res) => {
    const titulo = "about"
    res.render('about', {titulo});
});

module.exports = rutas;