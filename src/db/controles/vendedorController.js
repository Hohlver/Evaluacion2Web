    const connect = require("../conexion");
const tabla = "vendedor";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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

function logVendedor(correo, contraseña, res) {
    return new Promise((resolve, reject) => {
        connect.query(`SELECT * FROM ${tabla} WHERE correo =?`, [correo], (err, rows) => {
            if (err) {
                return reject(err);
            }

            if (rows.length === 0) {
                return reject(new Error('Usuario no encontrado'));
            }
            
            const vendedor = rows[0];

            if (vendedor.contraseña !== contraseña) {
                return reject(new Error('Contraseña incorrecta'));
            }
            
            const token = jwt.sign({ id: vendedor.id }, 'token_key'); 
            res.cookie('token', token, {httpOnly: true});
            return resolve({
                token: token, 
                vendedor: vendedor
            });

        });
    });
}

function valVendedor (correo, contraseña) {
    const validar = `SELECT * FROM ${tabla} WHERE correo =?`
    return new Promise((resolve, reject) => {
        connect.query(validar, [correo], async (err, rows) => {
            if (err) {
                return reject(new Error('Error en la consulta', err));
                reject (err);
            } else {
                if(rows.lenght>0){
                    const conAlmacenada = rows[0].contraseña;
                    console.log("contraseña añmacenada", conAlmacenada);
                    console.log("contraseña ingresada", contraseña);
                    const hatch = await bcrypt.compare( contraseña, conAlmacenada);
                    console.log("contraseña ingresada", hatch);
                    if (hatch) {
                        resolve(rows[0]);
                    } else {
                        resolve({message: "credenciales invalidas"});
                    }
                }else{
                    resolve({message: "usuario no registrado"});
                }
            }
        });
    });
}

module.exports = {verCompletaVendedor, agregarVendedor, editarVendedor, eliminarVendedor, logVendedor, valVendedor};