const mongoose = require('mongoose');
 const InventorySchema  = mongoose.Schema({
    InventoryName :{
        type : String,
        required : true
    },
    InventoryPrice :{
        type : Number ,
        required : true
    },
    InventoryCategory :{
        type : String,
        required : true
    },
    InventoryDesc :{
        type : String,
        required : true
    },
    InventoryImage :{
        type : String,
        required : true
    },
 })

const Inventory = mongoose.model('Product',InventorySchema);

module.exports = Inventory;