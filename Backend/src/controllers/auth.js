const userModel = require("../models/userModel");
const foodPartnerModel = require("../models/foodPatnerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//user level authentication
const registerUser = async (req, res) => {
    try{
        const { fullname, email, password } = req.body;

        if(!fullname || !email || !password){
            return res.status(400).send({
                message: "All fields are required",
            });
        }
        //check if user already exists
        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            return res.status(400).send({
                message: "User already exists",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        });
        //create token
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        console.log("jwt sectret: ", process.env.JWT_SECRET);
        console.log("user id: ", user._id);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        res.cookie("token", token, cookieOptions);
        return res.status(201).send({
            message: "User created successfully",
            user:{
                fullname: user.fullname,
                email: user.email,
                id: user._id,
            }
        });
    }
    catch(err){
        return res.status(500).send({
            message: "Error in registerUser",
            err:err.message,
        });
    }
}
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send({
                message: "All fields are required",
            });
        }
        //check if user exists
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).send({
                message: "User does not exist",
            });
        }
        //check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).send({
                message: "Invalid password",
            });
        }
        //create token
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        res.cookie("token", token, cookieOptions);
        return res.status(200).send({
            message: "User logged in successfully",
            user:{
                fullname: user.fullname,
                email: user.email,
                id: user._id,
            }
        });
    }
    catch(err){
        return res.status(500).send({
            message: "Error in loginUser",
            err:err.message,
        });
    }
}
const logoutUser = async (req, res) => {
    try{
        res.clearCookie("token");
        return res.status(200).send({
            message: "User logged out successfully",
        });
    }
    catch(err){
        return res.status(500).send({
            message: "Error in logout",
            err:err.message,
        });
    }
}

const getUserProfile = async (req, res) => {
    try{
        // req.user is set by authUserMiddleware
        const user = req.user;
        return res.status(200).send({
            message: "User profile retrieved successfully",
            user:{
                fullname: user.fullname,
                email: user.email,
                id: user._id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    }
    catch(err){
        return res.status(500).send({
            message: "Error in getUserProfile",
            err:err.message,
        });
    }
}

//food partner level authentication
const registerFoodPartner = async (req, res) => {
    try{
        const { name, email, password ,contact,address} = req.body;
        if(!name || !email || !password || !contact || !address){
            return res.status(400).send({
                message: "All fields are required",
            });
        }
        //check if user already exists
        const existingUser = await foodPartnerModel.findOne({ email });
        if(existingUser){
            return res.status(400).send({
                message: "User already exists",
            });
        }
        //hash password     
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword,
            contact,
            address,
            role:"foodpartner"
        });
        //create token
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };  
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        res.cookie("token", token, cookieOptions);
        return res.status(201).send({
            message: "User created successfully",
            user:{
                name: user.name,
                email: user.email,
                id: user._id,
            }
        });
       
    }
    catch(err){
        return res.status(500).send({
            message: "Error in registerFoodPartner",
            err:err.message,
        });
    }
};
const loginFoodPartner = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send({
                message: "All fields are required",
            });
        }
        //check if user exists
        const user = await foodPartnerModel.findOne({ email });
        if(!user){
            return res.status(400).send({
                message: "User does not exist",
            });
        }
        //check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).send({
                message: "Invalid password",
            });
        }
        //create token
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        
        res.cookie("token", token, cookieOptions);
        return res.status(200).send({
            message: "User logged in successfully",
            user:{
                fullname: user.fullname,
                email: user.email,
                id: user._id,
            }
        });
    }
    catch(err){
        return res.status(500).send({
            message: "Error in loginFoodPartner",
            err:err.message,
        });
    }
}
const logoutFoodPartner = async (req, res) => {
    try{
        res.clearCookie("token");
        return res.status(200).send({
            message: "User logged out successfully",
        });
    }
    catch(err){
        return res.status(500).send({
            message: "Error in logout",
            err:err.message,
        });
    }
}

const getFoodPartnerProfile = async (req, res) => {
    try {
        // The food partner is already available from the middleware
        const foodPartner = req.foodPatner;

        return res.status(200).json({
            message: "Food partner profile fetched successfully",
            user: {
                name: foodPartner.name,
                email: foodPartner.email,
                contact: foodPartner.contact,
                address: foodPartner.address,
                id: foodPartner._id,
                createdAt: foodPartner.createdAt,
                updatedAt: foodPartner.updatedAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching food partner profile",
            error: err.message,
        });
    }
}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getFoodPartnerProfile,
};