const express = require('express');
const router = express.Router();
const Miembro = require('../models/Miembro');

router.get('/nuevo', (req, res) => {
    res.render('nuevo-miembro');
});

router.post('/nuevo', async (req, res) => {
    try {
        const { identificacion, nombre, fecha_afiliacion, correo_electronico } = req.body;
        const nuevoMiembro = new Miembro({ identificacion, nombre, fecha_afiliacion, correo_electronico });
        await nuevoMiembro.save();
        res.redirect('/miembros/lista');
    } catch (error) {
        console.error('Error al crear el miembro:', error);
        res.status(500).send('Error al crear el miembro');
    }
});

router.get('/lista', async (req, res) => {
    try {
        const miembros = await Miembro.find();
        res.render('miembros-lista', { miembros });
    } catch (error) {
        console.error('Error al listar miembros:', error);
        res.status(500).send('Error al listar miembros');
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const miembro = await Miembro.findById(req.params.id);
        if (!miembro) {
            return res.status(404).send('Miembro no encontrado');
        }
        res.render('editar-miembro', { miembro });
    } catch (error) {
        console.error('Error al cargar miembro para editar:', error);
        res.status(500).send('Error al cargar el miembro para editar');
    }
});

router.post('/editar/:id', async (req, res) => {
    try {
        const { identificacion, nombre, fecha_afiliacion, correo_electronico } = req.body;
        await Miembro.findByIdAndUpdate(req.params.id, { identificacion, nombre, fecha_afiliacion, correo_electronico });
        res.redirect('/miembros/lista');
    } catch (error) {
        console.error('Error al actualizar miembro:', error);
        res.status(500).send('Error al actualizar el miembro');
    }
});

router.post('/eliminar/:id', async (req, res) => {
    try {
        await Miembro.findByIdAndDelete(req.params.id);
        res.redirect('/miembros/lista');
    } catch (error) {
        console.error('Error al eliminar miembro:', error);
        res.status(500).send('Error al eliminar el miembro');
    }
});

module.exports = router;


