const mongoose = require('mongoose');

// console.log("DB_URL is:", process.env.DB_URL);
function connectDB(){
    mongoose.connect("mongodb://localhost:27017/foodinsta")
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;