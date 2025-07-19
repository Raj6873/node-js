const express = require('express');
const fs = require('fs')
const Inventory = require('../models/InventoryModel');


const HomePage = async (req, res) => {
    const records = await Inventory.find({});
    res.render('index', { records });
}

// addProduct page
const ProductForm = async (req, res) => {
    res.render('add');
}

const InventoryProduct = async (req, res) => {
    console.log('addP', req.body);
    try {
        req.body.InventoryImage = req.file.path;

        const insert = await Inventory.create(req.body);

        if (insert) {
            console.log('Inventory added successfully');
            res.redirect('/');
        } else {
            console.log('Inventory not added');
            res.redirect('/addInventory');
        }
    } catch (error) {
        res.send(`<p>error : ${error}</p>`);
    }
}


module.exports = {
    HomePage, ProductForm, InventoryProduct
}
