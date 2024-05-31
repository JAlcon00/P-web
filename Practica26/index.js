const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    let productos = [
        {
            nombre: 'Coca Cola',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Pepsi',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Fanta',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Sprite',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Manzanita',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Boing',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Jumex',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Del Valle',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Squirt',
            precio: 15.50,
            cantidad: 10
        },
        {
            nombre: 'Jarritos',
            precio: 15.50,
            cantidad: 10
        },
    ];

    let htmlContent = `
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
        <table>
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>`;

    productos.forEach((producto) => {
        htmlContent += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
            </tr>`;
    });

    htmlContent += '</table>';

    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Escuchando en puerto ${port}`);
});
