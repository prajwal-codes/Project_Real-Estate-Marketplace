const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const userController = require("../controller/user");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'media/user');
    },
    filename: function (req, file, cb) {
      const temp = file.originalname.split(".");
      const ext = temp[temp.length - 1]    
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + ext;
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
const upload = multer({storage: storage})

router.put("/", authController.authorizeToken,upload.single('pic'), userController.updateUser);
router.get("/pic/:userpic", userController.getPic)
// router.get("/post", authController.authorizeToken, userController.getpost)

module.exports = router