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



rut.post('/crearProveedor', async (req, res) => {
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
        const id = req.params.id; 
        proveedorController.editarProveedor(id).then((resultado) => {
            res.status(200).json({ message: 'Proveedor editado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editando proveedor')
    }

});

rut.post('/eliminar/:id', (req, res) => {
    try {
        const id = req.params.id; 
        proveedorController.eliminarProveedor(id).then((resultado) => {
            res.status(200).json({ message: 'Proveedor eliminado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando proveedor')
    }

  });

module.exports = rut;