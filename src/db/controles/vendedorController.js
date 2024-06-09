const connect = require("../conexion");
const tabla = "vendedor";


function verCompletaVendedor(){
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

function agregarVendedor(data){
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

function editarVendedor(data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET ? WHERE id =?`;
        connect.query(query, [data, data.id], (error, result) =>{
            return error? reject(error) : resolve(result);
        });
    });
}

function eliminarVendedor(id) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE id=${id}`; 
        connect.query(query, (error, resultado) => {
            if (error) {
                return reject(error);
            }
            resolve(resultado);
        });
    });
}

module.exports = {verCompletaVendedor, agregarVendedor, editarVendedor, eliminarVendedor};