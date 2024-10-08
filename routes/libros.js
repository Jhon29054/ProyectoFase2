const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');
const Autor = require('../models/Autor');

router.get('/nuevo', async (req, res) => {
    try {
        const autores = await Autor.find(); 
        res.render('nuevo-libro', { autores }); 
    } catch (error) {
        console.error('Error al cargar los autores:', error);
        res.status(500).send('Error al cargar el formulario');
    }
});

router.post('/nuevo', async (req, res) => {
    try {
        const { identificacion, titulo, año_publicacion, genero, id_autor } = req.body;

        const autorExistente = await Autor.findById(id_autor);
        if (!autorExistente) {
            return res.status(400).send('Autor no encontrado');
        }

        const nuevoLibro = new Libro({
            identificacion,
            titulo,
            año_publicacion,
            genero,
            id_autor 
        });

        await nuevoLibro.save();
        res.redirect('/libros/lista');
    } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).send('Error al crear el libro');
    }
});

router.get('/lista', async (req, res) => {
    try {
        const libros = await Libro.find().populate('id_autor');
        res.render('libros-lista', { libros });
    } catch (error) {
        res.status(500).send('Error al listar libros');
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        const autores = await Autor.find(); 

        res.render('editar-libro', { libro, autores }); 
    } catch (error) {
        res.status(500).send('Error al cargar el libro para editar');
    }
});

router.post('/editar/:id', async (req, res) => {
    try {
        const { identificacion, titulo, año_publicacion, genero, id_autor } = req.body;

        await Libro.findByIdAndUpdate(req.params.id, {
            identificacion,
            titulo,
            año_publicacion,
            genero,
            id_autor 
        });

        res.redirect('/libros/lista');
    } catch (error) {
        res.status(500).send('Error al actualizar el libro');
    }
});

router.post('/eliminar/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.redirect('/libros/lista');
    } catch (error) {
        res.status(500).send('Error al eliminar el libro');
    }
});

module.exports = router;



