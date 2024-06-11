const {Router} = require('express');
const rut = Router();
const proveedorController = require('../db/controles/proveedorController.js');


rut.get('/', (req, res) => {
    const titulo = "proveedor"
    
    try{
        proveedorController.verCompletaProveedor().then((resul) => {
            //res.status(200).json({message: 'Mostrando proveedores', data: resul})
            res.render('proveedor', {titulo, resul});
        })

    }catch(err){
        console.error(err);
        res.status(500).send('Error mostrando proveedor')
    }
});

rut.get('/about', (req, res) => {
    res.send('proveedor about');
});

rut.post('/crear', (req, res) => {
    try{
        const data = req.body;
    proveedorController.agregarProveedor(data).then((resul) =>{
        res.status(200).json({message: 'Se agrego proveedor', data: resul})
    })
    }catch(err){
        console.error(err);
        res.status(500).send('Error creando proveedor')
    }
});

rut.get('/todos' , (req, res) => {
    try{
        proveedorController.verCompletaProveedor().then((resul) => {
            res.status(200).json({message: 'Mostrando proveedores', data: resul})
        })

    }catch(err){
        console.error(err);
        res.status(500).send('Error mostrando proveedor')
    }
   
});

rut.put('/editar:id', (req, res) =>{
    try {
        const id = req.body; 
        proveedorController.editarProveedor(id).then((resultado) => {
            res.status(200).json({ message: 'Proveedor editado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editando proveedor')
    }

});

rut.delete('/eliminar:id', (req, res) => {
    try {
        const id = req.body.id; 
        proveedorController.eliminarProveedor(id).then((resultado) => {
            res.status(200).json({ message: 'Proveedor eliminado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando proveedor')
    }

  });

module.exports = rut;