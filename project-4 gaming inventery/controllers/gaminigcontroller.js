const { unlink, unlinkSync } = require('fs');
const game = require('../models/gamingmodel');
const path = require('path');

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

        // Convert date to number if your schema expects a Number
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


//  delete logic
const Deletegame = async (req, res) => {
    const { id } = req.params;
    const record = await game.findById(id);

    unlinkSync(record.game_image);
    await game.findByIdAndDelete(id);

    res.redirect('/');
};

//update logic
const Updategame = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const record = await game.findById(id);
    res.render('edit', { record });
}

//edit logic
const Editgame = async (req, res) => { 
    const id = req.params.id;

    console.log(req.body);


    const record = await game.findById(id);

    if(req.file) {
        unlinkSync(record.game_image);
        req.body.game_cover = req.file.path;
        await game.findByIdAndUpdate(id, req.body);
    } else {
        req.body.game_cover = record.game_cover;
        await game.findByIdAndUpdate(id, req.body);
    }
    
    res.redirect('/');
}
module.exports = {
    homepage, RenderForm, insertgame, Deletegame, Updategame,Editgame
};    