const {Router} = require('express');
const rut = Router();
const productosController = require('../db/controles/productosController.js');


  rut.get('/', (req, res) => {
    const titulo = "productos"
    try {
        productosController.verCompleta().then((resul) => {
            //res.status(200).json({message: 'tablaProducto', data: resul}) <= version anterior de mostrar tabla
            res.render('productos', {titulo, resul});

        })
    }catch(err){
        console.error(err);
        res.status(500).send('Error mostrando producto');
    }
});




rut.post('/crearProducto', async (req, res) => {
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
      res.status(200).json({message: 'Producto agregado'});    
    }    
    catch (error) {
      console.error(error);
      res.status(500).sendFile(path.join(__dirname, '../views', 'productos.html'));    }
  });




rut.get('/todos' , (req, res) => {
    try {
        productosController.verCompleta().then((resul) => {
            res.status(200).json({message: 'tablaProducto', data: resul})
        })
    }catch(err){
        console.error(err);
        res.status(500).send('Error mostrando producto');
    }
    
});


rut.post('/eliminar/:id', (req, res) => {
    try {
        const id = req.params.id; 
        productosController.eliminarProducto(id).then((resultado) => {
            res.status(200).json({ message: 'Producto eliminado' });       
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando producto')
    }

  });
  

rut.post('/editar/:id', (req, res) =>{
    try {
        const id = req.params.id; 
        productosController.editarProducto(id).then((resultado) => {
            res.status(200).json({ message: 'Producto editado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Producto')
    }

});


module.exports = rut;