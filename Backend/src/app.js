require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoute');
const foodRoute = require('./routes/foodroute');
const cors = require('cors');


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://localhost:5173",
        "https://food-insta-frontend.vercel.app",
        "https://food-insta-frontend.netlify.app",
        "https://nikhil-kumar92976.netlify.app"
        
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/food',foodRoute);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;