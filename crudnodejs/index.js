const express = require('express');

const app = express();

app.use(express.json());

app.get('/hola', (req, res) => {
    res.json({ msg: `HOla mundo ${req.body.nombre}` });
});

app.listen(8080, () => {
    console.log('Server running in the port 8080');
})