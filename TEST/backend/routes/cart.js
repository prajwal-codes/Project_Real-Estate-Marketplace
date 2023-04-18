const express = require("express")
const router = express.Router()
const cartController = require("../controller/cart.js")
const authController = require("../controller/auth")
const userController = require("../controller/user")
// const multer = require("multer");
const { models } = require("mongoose")

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "media/posts");
// 	},
// 	filename: function (req, file, cb) {
// 		const temp = file.originalname.split(".");
// 		const ext = temp[temp.length - 1];
// 		const uniqueSuffix =
// 			Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + ext;
// 		cb(null, file.fieldname + "-" + uniqueSuffix);
// 	},
// });
// const upload = multer({storage: storage})

router.post("/",authController.authorizeToken, cartController.createCart)
router.get("/all", authController.authorizeToken, cartController.getCart)
// router.put("/",userController.updateCart)
module.exports = router