const express = require("express")
const router = express.Router()
const postController = require("../controller/post")
const authController = require("../controller/auth")
const { models } = require("mongoose")

router.post("/", postController.createPost)
router.get("/user/all", authController.authorizeToken, postController.getPosts)
router.get("/lists", postController.getAllPosts)
module.exports = router