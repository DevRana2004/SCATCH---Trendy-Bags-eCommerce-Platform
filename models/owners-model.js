const mongoose = require('mongoose');

// Define the schema
const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    picture: String,
    gstin: String
});

// Create the model using the schema
module.exports = mongoose.model('Owner', ownerSchema);


