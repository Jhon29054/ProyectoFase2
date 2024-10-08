const express = require('express');
const router = express.Router();
const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro');
const Miembro = require('../models/Miembro');


router.get('/nuevo', async (req, res) => {
    try {
        const libros = await Libro.find().select('titulo');  
        const miembros = await Miembro.find().select('nombre'); 
        res.render('nuevo-prestamo', { libros, miembros });
    } catch (error) {
        console.error('Error al cargar formulario de préstamo:', error);
        res.status(500).send('Error al cargar formulario de préstamo');
    }
});

router.post('/nuevo', async (req, res) => {
    try {
        const { identificacion, id_libro, id_miembro, fecha_prestamo, fecha_retorno } = req.body;

        const libro = await Libro.findById(id_libro);
        const miembro = await Miembro.findById(id_miembro);

        if (!libro || !miembro) {
            return res.status(400).send('Libro o miembro no encontrados');
        }

        const nuevoPrestamo = new Prestamo({ identificacion, id_libro, id_miembro, fecha_prestamo, fecha_retorno });
        await nuevoPrestamo.save();
        res.redirect('/prestamos/lista');
    } catch (error) {
        console.error('Error al crear el préstamo:', error);
        res.status(500).send('Error al crear el préstamo');
    }
});

router.get('/lista', async (req, res) => {
    try {
        const prestamos = await Prestamo.find()
            .populate({ path: 'id_libro', select: 'titulo' })   
            .populate({ path: 'id_miembro', select: 'nombre' });  
        res.render('prestamos-lista', { prestamos });
    } catch (error) {
        console.error('Error al listar préstamos:', error);
        res.status(500).send('Error al listar préstamos');
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id)
            .populate({ path: 'id_libro', select: 'titulo' })  
            .populate({ path: 'id_miembro', select: 'nombre' });   

        if (!prestamo) {
            return res.status(404).send('Préstamo no encontrado');
        }

        const libros = await Libro.find().select('titulo');  
        const miembros = await Miembro.find().select('nombre');  
        res.render('editar-prestamo', { prestamo, libros, miembros });
    } catch (error) {
        console.error('Error al cargar préstamo para editar:', error);
        res.status(500).send('Error al cargar el préstamo para editar');
    }
});

router.post('/editar/:id', async (req, res) => {
    try {
        const { identificacion, id_libro, id_miembro, fecha_prestamo, fecha_retorno } = req.body;
        await Prestamo.findByIdAndUpdate(req.params.id, { identificacion, id_libro, id_miembro, fecha_prestamo, fecha_retorno });
        res.redirect('/prestamos/lista');
    } catch (error) {
        console.error('Error al actualizar préstamo:', error);
        res.status(500).send('Error al actualizar el préstamo');
    }
});

router.post('/eliminar/:id', async (req, res) => {
    try {
        await Prestamo.findByIdAndDelete(req.params.id);
        res.redirect('/prestamos/lista');
    } catch (error) {
        console.error('Error al eliminar préstamo:', error);
        res.status(500).send('Error al eliminar el préstamo');
    }
});

module.exports = router;



