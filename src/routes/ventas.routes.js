const {Router} = require('express');
const rut = Router();
const ventasController = require('../db/controles/ventasController.js');


rut.get('/', (req, res) => {
    const titulo = "ventas"
    try{
        ventasController.verCompletaVenta().then((resul) => {
            //res.status(200).json({message: 'tabla Ventas', data: resul})
            res.render('ventas', {titulo, resul});
        })
    }catch(err){
        console.error(err);
        res.status(500).send('Error creando vendedor')
    }
});

rut.get('/about', (req, res) => {
    res.send('ventas about');
});

rut.post('/crear', (req, res) => {
    const data = req.body;
    ventasController.agregarVentas(data).then((resul) =>{
        res.status(200).json({message: 'Se agrego', data: resul})
    })
});

rut.get('/todos' , (req, res) => {
    try{
        ventasController.verCompletaVenta().then((resul) => {
            res.status(200).json({message: 'tabla Ventas', data: resul})
        })
    }catch(err){
        console.error(err);
        res.status(500).send('Error creando vendedor')
    }
    
});

rut.post('/eliminar/:id', (req, res) => {
    try {
        const id = req.params.id; 
        ventasController.eliminarVenta(id).then((resultado) => {
            res.status(200).json({ message: 'Venta eliminado', data: resultado });
          })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Venta')
    }

  });



module.exports = rut;