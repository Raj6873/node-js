const { unlink, unlinkSync } = require('fs');
const album = require('../models/musicmodel');
const path = require('path');

//home page
const homepage =async (req, res) => {
        const record = await album.find();
        res.render("index", { record }); 
};

//form page
const RenderForm = async (req, res) => {
    res.render("form"); 
};

// insert album
const insertalbum = async (req, res) => {
    try {
        console.log("Insert is loading...");
        console.log("Data Received:", req.body);
        console.log(req.file);

        if (req.file) {
            req.body.album_cover = req.file.path;
        }

        await album.create(req.body);
        console.log("Data stored successfully!");
        res.redirect('/');
    } catch (error) {
        console.error("Error inserting album:", error);
    }
};

//  delete logic
const DeleteAlbum = async (req, res) => {
    const { id } = req.params;
    const record = await album.findById(id);

    unlinkSync(record.album_cover);
    await album.findByIdAndDelete(id);

    res.redirect('/');
};

//update logic
const UpdateAlbum = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const record = await album.findById(id);
    res.render('edit', { record });
}

//edit logic
const EditAlbum = async (req, res) => { 
    const id = req.params.id;

    console.log(req.body);


    const record = await album.findById(id);

    if(req.file) {
        unlinkSync(record.album_cover);
        req.body.album_cover = req.file.path;
        await album.findByIdAndUpdate(id, req.body);
    } else {
        req.body.album_cover = record.album_cover;
        await album.findByIdAndUpdate(id, req.body);
    }
    
    res.redirect('/');
}
module.exports = {
    homepage, RenderForm, insertalbum, DeleteAlbum, UpdateAlbum,EditAlbum
};    