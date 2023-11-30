const { Schema, model } = require("mongoose");

const categorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = model('Category', categorySchema);

moduke.exports = Category;