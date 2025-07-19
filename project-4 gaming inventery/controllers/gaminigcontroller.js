const { unlink, unlinkSync } = require('fs');
const game = require('../models/gamingmodel');
const path = require('path');
const fs = require('fs');

//home page
const homepage =async (req, res) => {
        const record = await game.find();
        res.render("index", { record }); 
};

//form page
const RenderForm = async (req, res) => {
    res.render("form"); 
};

// insert game
const insertgame = async (req, res) => {
    try {
        console.log("Insert is loading...");
        console.log("Data Received:", req.body);
        console.log(req.file);

        req.body.game_date = new Date(req.body.game_date).getTime();

        if (req.file) {
            req.body.game_image = req.file.path;
        }

        await game.create(req.body);
        console.log("Data stored successfully!");
        res.redirect('/');
    } catch (error) {
        console.error("Error inserting game:", error);
        res.status(500).send("Something went wrong!");
    }
};


// //  delete logic
const Deletegame = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await game.findById(id);

        if (record && record.game_image) {
            try {
                fs.unlinkSync(record.game_image);
            } catch (err) {
                console.error(`Error deleting file: ${err.message}`);
            }
        }

        await game.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        console.error(`Error deleting game: ${err.message}`);
    }
};


//update logic
const Updategame = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const record = await game.findById(id);
        if (!record) {
            return res.status(404).send('Game not found');
        }

        res.render('edit', { record });
    } catch (error) {
        console.error('Error fetching game:', error);
    }
};


//edit logic

const Editgame = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Request Body:', req.body);

        const record = await game.findById(id);
        if (!record) {
            return res.status(404).send('Game not found');
        }

        // Handle image update
        if (req.file && req.file.path) {
            try {
                if (record.game_image) {
                    unlinkSync(record.game_image); // Delete old image
                }
            } catch (err) {
                console.error('Error deleting the old image:', err);
            }
            req.body.game_image = req.file.path;
        } else {
            req.body.game_image = record.game_image; // Retain old image if no new file
        }

        const updated = await game.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(500).send('Failed to update game');
        }

        res.redirect('/');
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).send('An error occurred while updating the game');
    }
};
module.exports = {
    homepage, RenderForm, insertgame, Deletegame, Updategame,Editgame
};    