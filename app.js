const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs'); 
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerHelper('eq', function(a, b) {
    return a === b;
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/biblioteca', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const libroRoutes = require('./routes/libros');
const miembroRoutes = require('./routes/miembros');
const autorRoutes = require('./routes/autores');
const prestamoRoutes = require('./routes/prestamos');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/libros', libroRoutes);
app.use('/miembros', miembroRoutes);
app.use('/autores', autorRoutes);
app.use('/prestamos', prestamoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


