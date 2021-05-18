//Creating the database schema for authors.

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


//exporting to 'Author' table in our database and passing the schema
module.exports = mongoose.model('Author', authorSchema);