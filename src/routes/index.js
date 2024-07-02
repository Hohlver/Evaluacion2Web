const {Router} = require('express');
const productoRuta = require('./productos.routes');
const proveedorRuta = require('./proveedor.routes')
const vendedorRuta = require('./vendedor.routes')
const ventasRuta = require('./ventas.routes')
const productosController = require('../db/controles/productosController.js');
const proveedorController = require('../db/controles/proveedorController.js');
const vendedorController = require('../db/controles/vendedorController.js');


const rutas = Router();
rutas.use('/productos', productoRuta);
rutas.use('/proveedor', proveedorRuta);
rutas.use('/vendedor', vendedorRuta);
rutas.use('/ventas', ventasRuta);

rutas.get('/', (req, res) => {
    const titulo = "home"
    res.render('home', {titulo});
});

rutas.get('/login', (req, res) => {
    const titulo = "login"
    res.render('login', {titulo});
});


rutas.post('/crearProducto', async (req, res) => {
    try {
      const { nombre, descripcion, precio, stock, id_proveedor } = req.body;
      const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        stock,
        id_proveedor
      };
  
      const result = await productosController.agregarProducto(nuevoProducto);
      res.status(200).json({message: 'Producto agregado'});    }    
      catch (error) {
      console.error(error);
      res.status(200).sendFile(path.join(__dirname, '../views', 'productos.html'));    }
  });

  rutas.post('/crearProveedor', async (req, res) => {
    try {
      const { nombre, direccion, telefono, correo } = req.body;
      const nuevoProveedor = {
        nombre,
        direccion,
        telefono,
        correo
      };
  
      const result = await proveedorController.agregarProveedor(nuevoProveedor);
      res.status(200).json({message: 'Proveedor agregado'});    
    }    
    catch (error) {
      console.error(error);
      res.status(500).sendFile(path.join(__dirname, '../views', 'proveedor.html'));    }
  });

  rutas.post('/crearVendedor', async (req, res) => {
    try {
      const { nombre, correo, contraseña, telefono } = req.body;
      const nuevoVendedor = {
        nombre,
        correo,
        contraseña,
        telefono
      };
  
      const result = await vendedorController.agregarVendedor(nuevoVendedor);
      res.status(200).json({message: 'vendedor agregado'});    
    }    
    catch (error) {
      console.error(error);
      res.status(500).sendFile(path.join(__dirname, '../views', 'vendedor.html'));    }
  });


module.exports = rutas;