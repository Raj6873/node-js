const Inventory = require('../model/InventoryModel');
const path = require('path');
const fs = require('fs');


const homepage = async (req, res) => {
        const record = await Inventory.find();
        res.render("index", { record }); 
};

module.exports ={
    homepage,
}