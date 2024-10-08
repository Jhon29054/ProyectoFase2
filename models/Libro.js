const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibroSchema = new Schema({
    identificacion: { type: Number, required: true },
    titulo: { type: String, required: true },
    año_publicacion: { type: Number, required: true },
    genero: { type: String, required: true },
    id_autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true }
});

module.exports = mongoose.model('Libro', LibroSchema);

