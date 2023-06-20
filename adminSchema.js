const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1/test")

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model("Admin", adminSchema)