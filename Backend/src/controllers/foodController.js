const storageService = require('../services/storageService');
const foodModle = require('../models/foodModle');
const { v4: uuid } = require("uuid");


async function createFood(req, res) {
    const fileUpload = await storageService.uploadFile(req.file.buffer, uuid());
    
    const foodItem = await foodModle.create({
        name : req.body.name,
        description : req.body.description,
        video: fileUpload.url,
        foodPatner : req.foodPatner._id
    })
    res.status(201).json({
        message:"food created sucessfully",
        food : foodItem
    })
}
async function getFood(req, res) {
    const foodItems = await foodModle.find({});
    res.status(200).json({
        message:"food created sucessfully",
        food : foodItems
    })
}
async function getAllUserFood(req,res){
    // console.log("req.foodPatner._id: ", req.foodPatner._id);
   const foodItems = await foodModle.find({foodPatner : req.foodPatner._id});
    res.status(200).json({
        message:"food fetched sucessfully",
        food : foodItems
    })
}

module.exports = {
    createFood,
    getFood,
    getAllUserFood
}