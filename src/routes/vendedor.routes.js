const {Router} = require('express');
const rut = Router();
const vendedorController = require('../db/controles/vendedorController.js');


rut.get('/', (req, res) => {
        const titulo = "vendedor"
     
        try {
            vendedorController.verCompletaVendedor().then((resul) => {
                //res.status(200).json({message: 'Mostrando Vendedores', data: resul})
                res.render('vendedor', {titulo, resul});
            })
        }catch(err){
            console.error(err);
            res.status(500).send('Error visualizando vendedor.');
        }
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


rut.post('/crearVendedor', async (req, res) => {
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

rut.put('/editar/:id', (req, res) =>{
    try {
        const id = req.params.id; 
        vendedorController.editarVendedor(id).then((resultado) => {
            res.status(200).json({ message: 'Vendedor editado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editando vendedor.')
    }

});


rut.delete('/eliminar/:id', (req, res) => {
    try {
        const id = req.params.id; 
        vendedorController.eliminarVendedor(id).then((resultado) => {
            res.status(200).json({ message: 'Vendedor eliminado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando vendedor.')
    }

  });

  rut.post('/login', (req, res) => {
    const {correo, contraseña} = req.body;
    try {
        vendedorController.logVendedor(correo, contraseña, res).then((resultado) =>{
            res.status(200).json({message: 'Login exitoso', data: resultado});
        })
    } catch(err) {
        console.error(err);
        res.status(500).send('Error en login.');
    }
});


module.exports = rut;