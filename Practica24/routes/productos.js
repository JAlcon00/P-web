const express = require('express');
const router = express.Router();
const db = require('../config.db.js');

router.get('/productos', (req, res) => {
    const query = 'SELECT * FROM tb_productos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
