const express = require('express');
const authController = require("../controllers/auth")
const { authUserMiddleware, authFoodPatnerMiddlerware } = require("../middleware/authMiddleware")

const router = express.Router();

//user route
router.post("/register", authController.registerUser); // done
router.post("/login", authController.loginUser); // done
router.get("/logout", authController.logoutUser); // done
router.get("/profile", authUserMiddleware, authController.getUserProfile); // get user profile

//food patner route
router.post("/register/foodpatner", authController.registerFoodPartner); // done
router.post("/login/foodpatner", authController.loginFoodPartner); // done
router.get("/logout/foodpatner", authController.logoutFoodPartner); // done
router.get("/profile/foodpatner", authFoodPatnerMiddlerware, authController.getFoodPartnerProfile); // get food partner profile

module.exports = router;