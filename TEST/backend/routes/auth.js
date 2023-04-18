const express = require("express")
const router = express.Router()

//importing controller
const authController = require("../controller/auth")

router.post("/register", authController.registerUser)
router.post("/login", authController.login)
router.post("/user",authController.authorizeToken, authController.getUser)
// router.post("/", authController.authorizeSell, authController.sell  )
router.post("/logout", authController.logout)

module.exports = router