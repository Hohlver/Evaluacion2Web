const {Router} = require('express');
const rut = Router();
const vendedorController = require('../db/controles/vendedorController.js');

rut.get('/', (req, res) => {
        res.send('vendedor');
});

rut.get('/about', (req, res) => {
        res.send('vendedor about');
});

rut.get('/todos' , (req, res) => {
    try {
        vendedorController.verCompletaVendedor().then((resul) => {
            res.status(200).json({message: 'Mostrando Vendedores', data: resul})
        })
    }catch(err){
        console.error(err);
        res.status(500).send('Error visualizando vendedor.');
    }

});

rut.post('/crear', (req, res) => {
    const data = req.body;
    try {
        vendedorController.agregarVendedor(data).then((resul) =>{
            res.status(200).json({message: 'Se agrego a:', data: resul})
        })
    }catch(err){
        console.error(err);
        res.status(500).send('Error creando vendedor.');
    }

});


rut.put('/editar:id', (req, res) =>{
    try {
        const id = req.body; 
        vendedorController.editarVendedor(id).then((resultado) => {
            res.status(200).json({ message: 'Vendedor editado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editando vendedor.')
    }

});


rut.delete('/eliminar:id', (req, res) => {
    try {
        const id = req.body.id; 
        vendedorController.eliminarVendedor(id).then((resultado) => {
            res.status(200).json({ message: 'Vendedor eliminado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando vendedor.')
    }

  });

module.exports = rut;