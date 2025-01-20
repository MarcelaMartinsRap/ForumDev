const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");

const router = express.Router();
const upload = multer();

router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/:id/avatar", upload.single("avatar"), userController.uploadAvatar);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;