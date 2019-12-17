const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("database connected");
    }
});