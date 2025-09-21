const mongoose = require('mongoose');

// console.log("DB_URL is:", process.env.DB_URL);
// "mongodb://localhost:27017/foodinsta"
function connectDB(){
    mongoose.connect(process.env.MONGOBD_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;