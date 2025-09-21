const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),
})

//food item creation
router.post('/', authMiddleware.authFoodPatnerMiddlerware, upload.single('video'), foodController.createFood);//done
router.get('/',foodController.getFood);

router.get('/getfood', authMiddleware.authFoodPatnerMiddlerware, foodController.getAllUserFood);


module.exports = router;