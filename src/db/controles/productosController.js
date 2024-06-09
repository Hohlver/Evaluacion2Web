const conn = require("../conexion");
const tabla = "producto";

function verCompleta(){
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${tabla}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function agregarProducto(data){
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO ${tabla} SET?`, data, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function editarProducto(data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET ? WHERE id =?`;
        conn.query(query, [data, data.id], (error, result) =>{
            return error? reject(error) : resolve(result);
        });
    });
}

function eliminarProducto(id){
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE id = ${id}`;
        conn.query(query, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}





module.exports = {verCompleta, agregarProducto, editarProducto, eliminarProducto};