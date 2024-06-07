const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();

const { connection } = require('./config.db')

const getProductos = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM productos', (err, rows) => {

            if (err) reject(err);
            resolve(rows);
            
        });
    });
};

