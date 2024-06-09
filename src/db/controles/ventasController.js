const connect = require("../conexion");
const tabla = "venta";

function verCompletaVenta(){
    return new Promise((resolve, reject) => {
        connect.query(`SELECT * FROM ${tabla}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function agregarVentas(data){
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO ${tabla} SET?`, data, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function editarVenta(data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET ? WHERE id =?`;
        connect.query(query, [data, data.id], (error, result) =>{
            return error? reject(error) : resolve(result);
        });
    });
}

function eliminarVenta(id){
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE id = ${id}`;
        connect.query(query, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}





module.exports = {verCompletaVenta, agregarVentas, eliminarVenta, editarVenta};