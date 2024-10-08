const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrestamoSchema = new Schema({
  identificacion: { type: Number, required: true },
  id_libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
  id_miembro: { type: mongoose.Schema.Types.ObjectId, ref: 'Miembro', required: true },
  fecha_prestamo: { type: Date, required: true },
  fecha_retorno: { type: Date, required: true }
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);
