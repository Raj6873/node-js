const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Patient = require('./models/hospital');

const app = express();
const port = 1000;

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/hospitalDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
    Patient.find().then(patients => {
        res.render('index', { PatientData: patients });
    });
});

app.get('/insert', (req, res) => res.render('form'));

// Add Patient
app.post('/addData', upload.single('patient_photo'), (req, res) => {
    const newPatient = new Patient({
        patient_name: req.body.patient_name,
        patient_age: req.body.patient_age,
        patient_gender: req.body.patient_gender,
        disease: req.body.disease,
        patient_photo: req.file ? `/images/${req.file.filename}` : '/images/default.png'
    });

    newPatient.save().then(() => res.redirect('/'));
});

// Table Route (Displays Patients)
app.get('/table', (req, res) => {
    Patient.find().then(patients => {
        res.render('table', { PatientData: patients });
    });
});

// Delete Patient
app.post('/delete/:id', (req, res) => {
    Patient.findByIdAndDelete(req.params.id).then(() => res.redirect('/'));
});

// Update Form
app.get('/update/:id', (req, res) => {
    Patient.findById(req.params.id).then(patient => {
        if (!patient) return res.redirect('/');
        res.render('edit', { patient });
    });
});

// Update Patient (Retains Image if None is Uploaded)
app.post('/updateData/:id', upload.single('patient_photo'), async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.redirect('/table');

        const updatedData = {
            patient_name: req.body.patient_name,
            patient_age: req.body.patient_age,
            patient_gender: req.body.patient_gender,
            disease: req.body.disease,
            patient_photo: req.file ? `/images/${req.file.filename}` : patient.patient_photo // Retain old photo if none uploaded
        };

        await Patient.findByIdAndUpdate(req.params.id, updatedData);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Start Server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
