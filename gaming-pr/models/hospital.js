const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patient_name: String,
    patient_age: Number,
    patient_gender: String,
    disease: String,
    patient_photo: String
});

module.exports = mongoose.model('Patient', PatientSchema);
