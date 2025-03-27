const express = require('express');
const db = require('./config/db');
const student = require('./models/students');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 2580;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedFileTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only images are allowed.'));
        }
        cb(null, true);
    }
});

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/studOperation', upload.single('image'), async (req, res) => {
    const { id, name, age, course } = req.body;
    console.log(req.file);

    let image = "";
    if (req.file) {
        image = req.file.path;
    }

    if (id) {
        const data = await student.findById(id);

        if (image) {
            console.log("New Image");
            if (fs.existsSync(data.image)) {
                fs.unlinkSync(data.image);
            }

            student.findByIdAndUpdate(id, { name, age, course, image })
                .then(() => {
                    console.log("Data is Updated");
                    res.redirect('/fetch');
                })
                .catch(err => console.log(err));
        } else {
            console.log("Old Image");
            student.findByIdAndUpdate(id, { name, gener, date, image: data.image })
                .then(() => {
                    console.log("Data is Updated");
                    res.redirect('/fetch');
                })
                .catch(err => console.log(err));
        }
    } else {
        // Insert
        student.create({ name, gener, date, image })
            .then(() => {
                console.log("Data inserted...");
                res.redirect('/');
            })
            .catch(err => console.log("Error ", err));
    }
});

app.get('/fetch', (req, res) => {
    student.find({})
        .then(records => {
            res.render('table', { records });
        })
        .catch(err => {
            console.log("Error", err);
            res.send(err);
        });
});

app.get('/deleteStud/:id', async (req, res) => {
    const id = req.params.id;
    console.log("Delete ID", id);

    try {
        const data = await student.findById(id);
        if (data.image && fs.existsSync(data.image)) {
            fs.unlinkSync(data.image);
            console.log("Image deleted successfully");
        }

        await student.findByIdAndDelete(id);
        console.log("Deleted Successfully");
        res.redirect('/fetch');
    } catch (err) {
        console.log("Error", err);
        res.status(500).send('Error deleting student');
    }
});

app.get("/editStud", (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.redirect('/fetch');
    }

    
    console.log("Update ID", id);

    student.findById(id)
        .then((record) => {
            res.render('edit', { record });
        })
        .catch((err) => {
            res.redirect('/fetch');
            console.log(err);
        });
});

app.listen(port, () => console.log('Server started...'));