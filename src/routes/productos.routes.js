const {Router} = require('express');
const rut = Router();
const productosController = require('../db/controles/productosController.js');


  rut.get('/', (req, res) => {
    res.send('productos');
});

rut.get('/about', (req, res) => {
    res.send('productos about');
});



rut.post('/crear', (req, res) => {
    try {
        const data = req.body;
    productosController.agregarProducto(data).then((resul) =>{
        res.status(200).json({message: 'Se agrego', data: resul})
    })
    }catch(err){
        console.error(err);
        res.status(500).send('Error creando producto');
    }

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


rut.delete('/eliminar:id', (req, res) => {
    try {
        const id = req.body.id; 
        productosController.eliminarProducto(id).then((resultado) => {
            res.status(200).json({ message: 'Producto eliminado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Producto')
    }

  });

rut.put('/editar:id', (req, res) =>{
    try {
        const id = req.body; 
        productosController.editarProducto(id).then((resultado) => {
            res.status(200).json({ message: 'Producto editado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Producto')
    }

});


module.exports = rut;