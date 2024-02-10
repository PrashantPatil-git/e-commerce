const router = require("express").Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const { verifyJWT } = require("../authentication/verifyToken");

// user routes

router.post("/user/signup", userController.registerUser);

router.post("/user/login", userController.authenticateUser);

// admin related routes

router.post("/admin/login", adminController.authenticateAdmin);

// export the express router
module.exports = router;
