const mongoose = require("mongoose");

const Task = new mongoose.Schema({
    list: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Task', Task);