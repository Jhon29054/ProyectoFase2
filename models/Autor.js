const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutorSchema = new Schema({
  identificacion: { type: Number, required: true },
  nombre: { type: String, required: true },
  fecha_nacimiento: { type: Date, required: true },
  nacionalidad: { type: String, required: true }
});

module.exports = mongoose.model('Autor', AutorSchema);
