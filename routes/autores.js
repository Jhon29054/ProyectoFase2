const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');


router.get('/nuevo', (req, res) => {
    res.render('nuevo-autor');  
});

router.post('/nuevo', async (req, res) => {
    try {
        const { identificacion, nombre, fecha_nacimiento, nacionalidad } = req.body;
        const nuevoAutor = new Autor({ identificacion, nombre, fecha_nacimiento, nacionalidad });
        await nuevoAutor.save();
        res.redirect('/autores/lista');
    } catch (error) {
        res.status(500).send('Error al crear el autor');
    }
});

router.get('/lista', async (req, res) => {
    try {
        const autores = await Autor.find();
        res.render('autores-lista', { autores });
    } catch (error) {
        res.status(500).send('Error al listar autores');
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        res.render('editar-autor', { autor });
    } catch (error) {
        res.status(500).send('Error al cargar el autor para editar');
    }
});

router.post('/editar/:id', async (req, res) => {
    try {
        const { identificacion, nombre, fecha_nacimiento, nacionalidad } = req.body;
        await Autor.findByIdAndUpdate(req.params.id, { identificacion, nombre, fecha_nacimiento, nacionalidad });
        res.redirect('/autores/lista');
    } catch (error) {
        res.status(500).send('Error al actualizar el autor');
    }
});

router.post('/eliminar/:id', async (req, res) => {
    try {
        await Autor.findByIdAndDelete(req.params.id);
        res.redirect('/autores/lista');
    } catch (error) {
        res.status(500).send('Error al eliminar el autor');
    }
});

module.exports = router;


