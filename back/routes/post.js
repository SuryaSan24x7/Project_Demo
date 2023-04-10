const express = require("express")
const router = express.Router()
const postController = require("../controller/post")
const authController = require("../controller/auth")
const multer = require("multer");
const { models } = require("mongoose")

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "media/posts");
	},
	filename: function (req, file, cb) {
		const temp = file.originalname.split(".");
		const ext = temp[temp.length - 1];
		const uniqueSuffix =
			Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + ext;
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});
const upload = multer({storage: storage})

router.post("/",upload.single("postMarksheet"), postController.createPost)
router.get("/user/all", authController.authorizeToken, postController.getPosts)
router.get("/lists", postController.getAllPosts)
module.exports = router