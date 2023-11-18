import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const passwordDb = process.env.DB_PASSWORD;

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: passwordDb,
    database: 'proyecto',
});

conection.connect((err) => {
    if (err) throw err
    console.log('Database connected');
});

app.use(express.json());

app.get('/api/maestros', (req, res) => {

    conection.query('SELECT * FROM maestros', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

app.get('/api/maestros/:id', (req, res) => {
    const id = req.params.id;

    conection.query(`SELECT * FROM maestros WHERE clave = ${id} LIMIT 1`, (err, row) => {
        if (err) throw err;

        if (row.length === 0) return res.status(400).json({ msg: `El maestro con el id ${id} no existe` });

        res.json(row);
    })
});

app.post('/api/maestros/crear', (req, res) => {
    const { cla, nom, dep, est } = req.body;

    const data = { clave: cla, nombre: nom, departamento: dep, estatus: est };

    const query = 'INSERT INTO maestros SET ?';

    conection.query(query, data, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/api/maestros/actualizar/:id', (req, res) => {
    const clave = req.params.id;
    const { nom: nombre, dep: departamento, est: estatus } = req.body;


    const query = 'UPDATE maestros SET nombre=?, departamento=?, estatus=? WHERE clave=?';

    conection.query(query, [nombre, departamento, estatus, clave], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.delete('/api/maestros/borrar/:id', (req, res) => {
    const clave = req.params.id;

    const query = 'DELETE FROM maestros WHERE clave=?';

    conection.query(query, [clave], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

const port = 8081;

app.listen(port, () => {
    console.log(`Server running in the port ${port}`);
});