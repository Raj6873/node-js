const mongoose = require('mongoose');
const path = require('path');

const Inventoryschema = new mongoose.Schema({
    Inventory_Name : {
        type: String,
        required: true
    },
    Inventory_price : {
        type: String,
        required: true
    },
    Inventory_location : {
        type: String,
        required: true
    },
    Inventory_catrgroy : {
        type: String,
        required: true
    },
    Inventory_image : {
        type: String,
        required: true
    }, 
    Inventory_city : {
        type: String,
        required: true
    },
    Inventory_desc : {
        type: String,
        required: true
    },
    
});
module.exports = mongoose.model('Inventory',Inventoryschema);