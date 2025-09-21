const foodPatnerModel = require("../models/foodPatnerModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// async function authFoodPatnerMiddlerware(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).send("Access Denied");

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         const foodPartner = await foodPatnerModel.findById(decoded.id);

//         req.foodPartner = foodPartner
//         console.log(req.foodPartner)
//         next()
//     }
//     catch(err){
//         res.status(400).send("Invalid Token");
//     }
// }
async function authFoodPatnerMiddlerware(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);


    const foodPatner = await foodPatnerModel.findById(decoded.userId);
    if (!foodPatner) return res.status(404).json({ message: "Food partner not found" });

    req.foodPatner = foodPatner; 
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
}


// async function authUserMiddleware(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).send("Access Denied");
//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         const user = await userModel.findById(decoded.id);

//         req.user = user

//         next()
//     }
//     catch(err){
//         res.status(400).send("Invalid Token");
//     }
// }
async function authUserMiddleware(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; 
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  } 
}


module.exports = { authFoodPatnerMiddlerware, authUserMiddleware };