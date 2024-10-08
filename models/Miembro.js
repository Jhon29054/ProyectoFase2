const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MiembroSchema = new Schema({
  identificacion: { type: Number, required: true },
  nombre: { type: String, required: true },
  fecha_afiliacion: { type: Date, required: true },
  correo_electronico: { type: String, required: true }
});

module.exports = mongoose.model('Miembro', MiembroSchema);
