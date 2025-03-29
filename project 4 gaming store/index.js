const express = require('express');
const db = require('./config/db');
const cars = require('./models/gaming-inventery');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 2580;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // MiddleWare
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }); // File Middleware

app.get('/', (req, res) => {
    res.render('form');
})

// Insert
app.post('/game-inventory', upload.single('image'), async (req, res) => {

    const { id, brand, model, price, color } = req.body;

    console.log(req.file);

    let image = "";

    if (req.file) {
        image = req.file.path;
    }

    if (id) {
        // Edit

        const data = await cars.findById(id);

        if (image) {
            console.log("New Image");

            fs.unlinkSync(data.image)

            game.findByIdAndUpdate(id, {
               game_name,
               game_gener,
               game_date,
               image: data.image,
            }).then(() => {
                console.log("Data is Updated");
                res.redirect('/fetch');
            }).catch((err) => {
                console.log(err);
            });

        } else {
            console.log("Old Image");

            game.findByIdAndUpdate(id, {
                game_name,
                game_gener,
                game_date,
                image: data.image,
            }).then(() => {
                console.log("Data is Updated");
                res.redirect('/fetch');
            }).catch((err) => {
                console.log(err);
            });
        }

    } else {
        // Insert
        game.create({
            game_name,
                game_gener,
                game_date,
                image: data.image,
        }).then(() => {
            console.log("Data inserted...");
            res.redirect('/');
        }).catch((err) => {
            console.log("Error ", err);
        })
    }
    res.redirect('/fetch');
})

// Fetch
app.get('/fetch', (req, res) => {

    game.find({}).then((records) => {
        // console.log(records);
        res.render('table', { records });


    }).catch((err) => {
        console.log("Error", err);
        res.send(err);
    });
})

// Delete
app.get('/delete/:id', async (req, res) => {
    // const id = req.query.id;
    const id = req.params.id;
    console.log("Delete ID", id);

    const data = await cars.findById(id);

    console.log(data);

    fs.unlinkSync(data.image);

    cars.findByIdAndDelete(id).then(() => {
        console.log("Deleted Succussfully..");
    }).catch((err) => {
        console.log("Error", err);
    });

    res.redirect('/fetch');
})

// Edit Route 
app.get("/edit", (req, res) => {
    const id = req.query.id;

    console.log("Update ID", id);


    cars.findById(id).then((record) => {
        console.log(record);
        res.render('edit', { record });
    }).catch((err) => {
        res.redirect('/fetch');
        console.log(err);
    })
})


app.listen(port, (err) =>{
    if(err){
        console.log("server is mot connected");
    }
    console.log("server is  connected",port);

});